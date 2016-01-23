package foundation

import (
	"fmt"
	"net/url"
	"strings"
	"testing"

	"github.com/gophergala2016/source/core/foundation/foundationtest/gintest"
	"github.com/stretchr/testify/assert"
)

func init() {
	gintest.Init()
}

// TestFoundationContext runs
func TestFoundationContext(t *testing.T) {
	assert := assert.New(t)

	assert.Implements((*Context)(nil), new(FoundationContext))
	var ctx Context = NewContext(gintest.SharedContext())
	{
		tm, ok := ctx.Deadline()
		assert.True(tm.IsZero())
		assert.False(ok)
	}
	{
		assert.Nil(ctx.Done())
	}
	{
		assert.Nil(ctx.Err())
	}
	{
		assert.Nil(ctx.Value(""))
	}
}

// TestFoundationContextCopy runs
func TestFoundationContextCopy(t *testing.T) {
	assert := assert.New(t)

	var (
		ctx   *FoundationContext = (NewContext(gintest.SharedContext())).(*FoundationContext)
		same  *FoundationContext = ctx
		other *FoundationContext = ctx.Copy()
	)

	// ctx vs same
	assert.Equal(fmt.Sprintf("%p", ctx), fmt.Sprintf("%p", same))
	assert.Equal(ctx.ctx, same.ctx)
	if ctx.opt != nil {
		assert.Equal(ctx.opt, same.opt)
	}

	// ctx vs other
	assert.NotEqual(fmt.Sprintf("%p", ctx), fmt.Sprintf("%p", other))
	assert.Equal(ctx.ctx, other.ctx)
	if ctx.opt != nil {
		assert.NotEqual(ctx.opt, other.opt)
	}
}

// TestFoundationOperation runs
func TestFoundationOperation(t *testing.T) {
	assert := assert.New(t)

	var ctx Context = NewContext(gintest.SharedContext())
	o := ctx.Operation()
	assert.NotNil(o)
	assert.Implements((*Operation)(nil), o)
	assert.NotPanics(func() {
		o.Next()
	})
}

// TestFoundationRender runs
func TestFoundationRender(t *testing.T) {
	assert := assert.New(t)

	var ctx Context = NewContext(gintest.SharedContext())
	o := ctx.Render()
	assert.NotNil(o)
	assert.Implements((*Render)(nil), o)
	assert.NotPanics(func() {
		o.JSON(200, map[string]string{"foo": "bar"})
		o.HTML(200, "index", map[string]string{"foo": "bar"})
	})
}

// TestFoundationRequest runs
func TestFoundationRequest(t *testing.T) {
	assert := assert.New(t)

	var ctx Context = NewContext(gintest.SharedContext())
	o := ctx.Request()
	assert.NotNil(o)
	assert.Implements((*Request)(nil), o)
	assert.NotPanics(func() {
		orgReq := (ctx.(*FoundationContext)).opt.Request
		clnReq := o.Clone()
		assert.NotEqual(fmt.Sprintf("%p", orgReq), fmt.Sprintf("%p", clnReq), "Shouldn't be equal.")
		assert.Equal(orgReq, clnReq, "Should be the same contained object")
		assert.False(o.RequestedAt().IsZero())
		assert.Equal([]byte(""), o.Body())
		assert.Equal([]byte(""), o.Body())
		assert.Equal("/", o.URL().String())
		assert.Equal("GET", o.Method())
		assert.Equal(url.Values{}, o.Query())

		ipAddr := o.ClientIP()
		assert.True(strings.HasPrefix(ipAddr, "127.0.0.1") || strings.HasPrefix(ipAddr, "[::1]"))
		assert.Equal("Go-http-client/1.1", o.UserAgent())
		assert.Equal("", o.Header("foobar"), "Doesn't exist a value of the key")
		assert.Equal(o.UserAgent(), o.Header("User-Agent"), "Doesn't exist a value of the key")

		// X-Forwarded-For
		(ctx.(*FoundationContext)).opt.Request.Header.Set("X-Forwarded-For", "10.0.0.1")
		assert.True(strings.HasPrefix(o.ClientIP(), "10.0.0.1"))

		// X-Real-Ip
		(ctx.(*FoundationContext)).opt.Request.Header.Set("X-Real-Ip", "10.0.0.2")
		assert.True(strings.HasPrefix(o.ClientIP(), "10.0.0.2"))
	})
}

// TestFoundationResponse runs
func TestFoundationResponse(t *testing.T) {
	assert := assert.New(t)

	var ctx Context = NewContext(gintest.SharedContext())
	o := ctx.Response()
	assert.NotNil(o)
	assert.Implements((*Response)(nil), o)
}

// TestFoundationSession runs
func TestFoundationSession(t *testing.T) {
	assert := assert.New(t)

	var ctx Context = NewContext(gintest.SharedContext())
	o := ctx.Session()
	assert.NotNil(o)
	assert.Implements((*Session)(nil), o)
}

// TestFoundationContextValue runs
func TestFoundationContextValue(t *testing.T) {
	assert := assert.New(t)

	var (
		ctx Context = NewContext(gintest.SharedContext())
		val interface{}
	)

	val = ctx.Value("test")
	assert.Nil(val)
	if assert.Equal(ctx, ctx.WithValue("test", 123)) {
		val = ctx.Value("test")
		if assert.NotNil(val) {
			assert.Equal(123, val)
		}
		val = ctx.Value("not exists")
		assert.Nil(val)
	}
	val = ctx.Param("test")
	assert.Equal("", val)
}
