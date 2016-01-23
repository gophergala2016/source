package foundation

import (
	"io/ioutil"
	"net/http"
	"net/url"
	"sync"
	"time"

	"golang.org/x/net/context"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

type (
	// Context is the most important part of foundation.
	Context interface {
		context.Context
		WithValue(interface{}, interface{}) Context
		Param(string) string
		Operation() Operation
		Render() Render
		Request() Request
		Response() Response
		Session() Session
	}

	FoundationContext struct {
		ctx      context.Context
		opt      *gin.Context
		mu       sync.Mutex
		request  *request
		response *response
	}

	request struct {
		requestedAt time.Time
		body        []byte
		method      string
	}

	response struct {
	}

	Operation interface {
		Next()
	}

	Render interface {
		HTML(int, string, interface{})
		JSON(int, interface{})
	}

	Request interface {
		Clone() *http.Request
		Body() []byte
		Method() string
		Query() url.Values
		URL() *url.URL
		RequestedAt() time.Time
		ClientIP() string
		UserAgent() string
		Header(string) string
	}

	Response interface {
		http.ResponseWriter
	}

	Session sessions.Session
)

// NewContext returns
func NewContext(c *gin.Context) Context {
	cp := FoundationContext{}
	cp.reset()
	cp.opt = c
	return &cp
}

func (c *FoundationContext) reset() {
	c.ctx = context.Background()
	c.request = &request{
		requestedAt: time.Now(),
	}
	c.response = &response{}
}

func (c *FoundationContext) Copy() *FoundationContext {
	c.mu.Lock()
	var cp FoundationContext = *c
	cp.reset()
	if cp.opt != nil {
		cp.opt = cp.opt.Copy()
	}
	c.mu.Unlock()
	return &cp
}

////////////////////////////////////////
/// golang.org/x/net/context
////////////////////////////////////////

// Deadline returns the time when work done on behalf of this context
// should be canceled.  Deadline returns ok==false when no deadline is
// set.  Successive calls to Deadline return the same results.
func (c *FoundationContext) Deadline() (deadline time.Time, ok bool) {
	return c.ctx.Deadline()
}

// Done returns a channel that's closed when work done on behalf of this
// context should be canceled.  Done may return nil if this context can
// never be canceled.  Successive calls to Done return the same value.
func (c *FoundationContext) Done() <-chan struct{} {
	return c.ctx.Done()
}

// Err returns a non-nil error value after Done is closed.  Err returns
// Canceled if the context was canceled or DeadlineExceeded if the
// context's deadline passed.  No other values for Err are defined.
// After Done is closed, successive calls to Err return the same value.
func (c *FoundationContext) Err() error {
	return c.ctx.Err()
}

// Value returns the value associated with this context for key, or nil
// if no value is associated with key.  Successive calls to Value with
// the same key returns the same result.
func (c *FoundationContext) Value(key interface{}) interface{} {
	return c.ctx.Value(key)
}

////////////////////////////////////////
/// Extends golang.org/x/net/context
////////////////////////////////////////

// WithValue returns a copy of parent in which the value associated with
// key is val.
func (c *FoundationContext) WithValue(key, val interface{}) Context {
	c.mu.Lock()
	c.ctx = context.WithValue(c.ctx, key, val)
	c.mu.Unlock()
	return c
}

// Param is a shortcut for c.opt.Param
func (c *FoundationContext) Param(key string) string {
	return c.opt.Param(key)
}

// Operation returns Operation interface
func (c *FoundationContext) Operation() Operation {
	return c
}

// Render returns Render interface
func (c *FoundationContext) Render() Render {
	return c
}

// Request returns Request interface
func (c *FoundationContext) Request() Request {
	return c
}

// Response returns Response interface
func (c *FoundationContext) Response() Response {
	return c.opt.Writer
}

// Session returns Session interface
func (c *FoundationContext) Session() Session {
	return sessions.Default(c.opt)
}

////////////////////////////////////////
/// Operation interface
////////////////////////////////////////

// Next executes the pending handlers
func (c *FoundationContext) Next() {
	c.opt.Next()
}

////////////////////////////////////////
/// Render interface
////////////////////////////////////////

// HTML renders the HTTP template specified by its file name.
// It also updates the HTTP code and sets the Content-Type as "text/html".
// See http://golang.org/doc/articles/wiki/
func (c *FoundationContext) HTML(code int, name string, obj interface{}) {
	c.opt.HTML(code, name, obj)
}

// JSON serializes the given struct as JSON into the response body.
// It also sets the Content-Type as "application/json".
func (c *FoundationContext) JSON(code int, obj interface{}) {
	c.opt.JSON(code, obj)
}

////////////////////////////////////////
/// Request interface
////////////////////////////////////////

// Clone returns the cloned request of the Context.
func (c *FoundationContext) Clone() *http.Request {
	cp := *c.opt.Request
	return &cp
}

// RequestedAt returns a datetime.
func (c *FoundationContext) RequestedAt() time.Time {
	return c.request.requestedAt
}

// Body returns a body of the request.
func (c *FoundationContext) Body() []byte {
	if c.request.body != nil {
		return c.request.body
	}
	body, err := ioutil.ReadAll(c.opt.Request.Body)
	if err != nil {
		return nil
	}
	c.request.body = body
	return body
}

// Method returns a HTTP Method of the request.
func (c *FoundationContext) Method() string {
	return c.opt.Request.Method
}

// Query returns a query of the request.
func (c *FoundationContext) Query() url.Values {
	return c.opt.Request.URL.Query()
}

// Method returns the requested url.
func (c *FoundationContext) URL() *url.URL {
	return c.opt.Request.URL
}

// ClientIP implements a best effort algorithm to return the real client IP, it parses
// X-Real-IP and X-Forwarded-For in order to work properly with reverse-proxies such us: nginx or haproxy.
func (c *FoundationContext) ClientIP() string {
	return c.opt.ClientIP()
}

// UserAgent returns the User-Agent of the request.
func (c *FoundationContext) UserAgent() string {
	return c.Header("User-Agent")
}

// Header returns a header of the request by key.
func (c *FoundationContext) Header(key string) string {
	if values, _ := c.opt.Request.Header[key]; len(values) > 0 {
		return values[0]
	}
	return ""
}

////////////////////////////////////////
/// Response interface
////////////////////////////////////////
