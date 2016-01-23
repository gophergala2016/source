package controllers

import (
	"net/http"
)

func (c *webController) SetTemplateName(name string) {
	c.templateName = name
}

// HTTP Status Code Definitions
// Successful 2xx

// OK returns 200 OK Status Code
func (c webController) OK(v interface{}) {
	c.RootController.HTML(http.StatusOK, c.templateName, v)
}

// Created returns 201 Created Status Code
func (c webController) Created(v interface{}) {
	c.RootController.HTML(http.StatusCreated, c.templateName, v)
}

// NoContent returns 204 No Content Status Code
func (c webController) NoContent(v interface{}) {
	c.RootController.HTML(http.StatusNoContent, c.templateName, v)
}

// HTTP Status Code Definitions
// Client Error 3xx

// NoContent returns 307 Temporary Redirect Status Code
func (c webController) TemporaryRedirect(v interface{}) {
	c.RootController.HTML(http.StatusTemporaryRedirect, c.templateName, v)
}

// HTTP Status Code Definitions
// Client Error 4xx

// BadRequest returns 400 Bad Request Status Code
func (c webController) BadRequest(v interface{}) {
	c.RootController.HTML(http.StatusBadRequest, c.templateName, v)
}

// Unauthorized returns 401 Unauthorized Status Code
func (c webController) Unauthorized(v interface{}) {
	c.RootController.HTML(http.StatusUnauthorized, c.templateName, v)
}

// Forbidden returns 403 Forbidden Status Code
func (c webController) Forbidden(v interface{}) {
	c.RootController.HTML(http.StatusForbidden, c.templateName, v)
}

// NotFound returns 404 Not Found Status Code
func (c webController) NotFound(v interface{}) {
	c.RootController.HTML(http.StatusNotFound, c.templateName, v)
}

// MethodNotAllowed returns 405 Method Not Allowed Status Code
func (c webController) MethodNotAllowed(v interface{}) {
	c.RootController.HTML(http.StatusMethodNotAllowed, c.templateName, v)
}

// NotAcceptable returns 406 Not Acceptable Status Code
func (c webController) NotAcceptable(v interface{}) {
	c.RootController.HTML(http.StatusNotAcceptable, c.templateName, v)
}

// Conflict returns 409 Conflict Status Code
func (c webController) Conflict(v interface{}) {
	c.RootController.HTML(http.StatusConflict, c.templateName, v)
}

// UnsupportedMediaType returns 415 Unsupported Media Type Status Code
func (c webController) UnsupportedMediaType(v interface{}) {
	c.RootController.HTML(http.StatusUnsupportedMediaType, c.templateName, v)
}

// HTTP Status Code Definitions
// Server Error 5xx

// InternalServerError returns  500 Internal Server Error Status Code
func (c webController) InternalServerError(v interface{}) {
	c.RootController.HTML(http.StatusInternalServerError, c.templateName, v)
}

// ServiceUnavailable returns 503 Service Unavailable Status Code
func (c webController) ServiceUnavailable(v interface{}) {
	c.RootController.HTML(http.StatusServiceUnavailable, c.templateName, v)
}
