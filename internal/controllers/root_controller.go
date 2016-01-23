package controllers

import (
	"encoding/json"
	"reflect"
	"strings"

	"github.com/mitchellh/mapstructure"

	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/infra/database"
	"github.com/gophergala2016/source/core/net/context/accessor"
	"github.com/gophergala2016/source/internal/modules/parameters"
)

type (
	RootController struct {
		foundation.RootController
		*apiController
		*webController
	}
	apiController struct {
		*RootController
	}
	webController struct {
		*RootController
		templateName string
	}
	APIController interface {
		Controller
		Preprocess(parameters.RequestParameter) bool
	}
	WebController interface {
		Controller
		SetTemplateName(string)
	}
	Controller interface {
		// OK returns 200 OK Status Code
		OK(interface{})
		// Created returns 201 Created Status Code
		Created(interface{})
		// NoContent returns 204 No Content Status Code
		NoContent(interface{})
		// NoContent returns 307 Temporary Redirect Status Code
		TemporaryRedirect(interface{})
		// BadRequest returns 400 Bad Request Status Code
		BadRequest(interface{})
		// Unauthorized returns 401 Unauthorized Status Code
		Unauthorized(interface{})
		// Forbidden returns 403 Forbidden Status Code
		Forbidden(interface{})
		// NotFound returns 404 Not Found Status Code
		NotFound(interface{})
		// MethodNotAllowed returns 405 Method Not Allowed Status Code
		MethodNotAllowed(interface{})
		// NotAcceptable returns 406 Not Acceptable Status Code
		NotAcceptable(interface{})
		// Conflict returns 409 Conflict Status Code
		Conflict(interface{})
		// UnsupportedMediaType returns 415 Unsupported Media Type Status Code
		UnsupportedMediaType(interface{})
		// InternalServerError returns  500 Internal Server Error Status Code
		InternalServerError(interface{})
		// ServiceUnavailable returns 503 Service Unavailable Status Code
		ServiceUnavailable(interface{})
	}
)

// SetContext sets foundation.Context to initialize controller.
func (c *RootController) SetContext(ctx foundation.Context) {
	c.RootController.SetContext(ctx)

	// Set database to context
	orm := database.NewGorm()
	accessor.SetDatabase(ctx, orm)
}

// API returns APIController Interface
func (c *RootController) API() APIController {
	if c.apiController == nil {
		c.apiController = &apiController{RootController: c}
	}
	return c.apiController
}

// Web returns WebController Interface
func (c *RootController) Web() WebController {
	if c.webController == nil {
		c.webController = &webController{RootController: c}
	}
	return c.webController
}

// HTML renders the HTTP template specified by its file name.
// It also updates the HTTP code and sets the Content-Type as "text/html".
// See http://golang.org/doc/articles/wiki/
func (c *RootController) HTML(code int, name string, obj interface{}) {
	c.GetContext().Render().HTML(code, name, obj)
}

// JSON serializes the given struct as JSON into the response body.
// It also sets the Content-Type as "application/json".
func (c *RootController) JSON(code int, obj interface{}) {
	c.GetContext().Render().JSON(code, obj)
}

// IsAllowedMethod checks HTTP Method
func (c RootController) IsAllowedMethod() bool {
	switch c.GetContext().Request().Method() {
	case "GET", "POST", "PATCH", "PUT", "DELETE":
		return true
	}
	return false
}

// ParseRequestParameter applies parameters of request from body and query.
func (c RootController) ParseRequestParameter(p parameters.RequestParameter) error {
	req := c.GetContext().Request()

	// Request Body
	if b := req.Body(); len(b) > 0 {
		if err := json.Unmarshal(b, p); err != nil {
			return err
		}
	}

	// Request Query
	query := map[string]interface{}{}
	// Modify query into parsable one
	for k, v := range req.Query() {
		if strings.HasSuffix(k, "[]") {
			// e.g.) foo[]=[]string => foo=[]string
			query[k[:len(k)-2]] = v
		} else {
			// e.g.) foo=[]string => foo=string
			query[k] = v[0]
		}
	}
	mapcfg := &mapstructure.DecoderConfig{
		WeaklyTypedInput: true,
		Result:           p,
	}
	decoder, err := mapstructure.NewDecoder(mapcfg)
	if err != nil {
		return err
	}
	if err = decoder.Decode(query); err != nil {
		return err
	}
	return nil
}

// GetRequestParameter returns a value by key.
func (c RootController) GetRequestParameter(key string) interface{} {
	req := c.GetContext().Request()

	if b := req.Body(); len(b) > 0 {
		data := map[string]interface{}{}
		if err := json.Unmarshal(b, &data); err != nil {
			return err
		}
		if v, found := data[key]; found {
			return v
		}
	}

	query := req.Query()
	if v := query[key]; v != nil {
		if ref := reflect.ValueOf(v); !ref.IsNil() {
			return query.Get(key)
		}
	}

	return nil
}
