package controllers

import (
	"net/http"

	"github.com/gophergala2016/source/internal/modules/parameters"
)

func (c *apiController) Preprocess(p parameters.RequestParameter) bool {
	// Validate Request Method
	if !c.IsAllowedMethod() {
		c.MethodNotAllowed(map[string]interface{}{
			"status":  "NG",
			"message": "Method Not Allowed",
		})
		return false
	}

	// Parse Request Parameter
	if err := c.ParseRequestParameter(p); err != nil {
		c.BadRequest(map[string]interface{}{
			"status":  "NG",
			"func":    "ParseRequestParameter",
			"message": err,
		})
		return false
	}

	// Validate Request Parameter
	if err := p.Validate(); err != nil {
		c.BadRequest(map[string]interface{}{
			"status":  "NG",
			"func":    "Validate",
			"message": err,
		})
		return false
	}

	// TODO:

	return true
}

// HTTP Status Code Definitions
// Successful 2xx

// OK returns 200 OK Status Code
func (c apiController) OK(v interface{}) {
	c.RootController.JSON(http.StatusOK, v)
}

// Created returns 201 Created Status Code
func (c apiController) Created(v interface{}) {
	c.RootController.JSON(http.StatusCreated, v)
}

// NoContent returns 204 No Content Status Code
func (c apiController) NoContent(v interface{}) {
	c.RootController.JSON(http.StatusNoContent, v)
}

// HTTP Status Code Definitions
// Client Error 3xx

// NoContent returns 307 Temporary Redirect Status Code
func (c apiController) TemporaryRedirect(v interface{}) {
	c.RootController.JSON(http.StatusTemporaryRedirect, v)
}

// HTTP Status Code Definitions
// Client Error 4xx

// BadRequest returns 400 Bad Request Status Code
func (c apiController) BadRequest(v interface{}) {
	c.RootController.JSON(http.StatusBadRequest, v)
}

// Unauthorized returns 401 Unauthorized Status Code
func (c apiController) Unauthorized(v interface{}) {
	c.RootController.JSON(http.StatusUnauthorized, v)
}

// Forbidden returns 403 Forbidden Status Code
func (c apiController) Forbidden(v interface{}) {
	c.RootController.JSON(http.StatusForbidden, v)
}

// NotFound returns 404 Not Found Status Code
func (c apiController) NotFound(v interface{}) {
	c.RootController.JSON(http.StatusNotFound, v)
}

// MethodNotAllowed returns 405 Method Not Allowed Status Code
func (c apiController) MethodNotAllowed(v interface{}) {
	c.RootController.JSON(http.StatusMethodNotAllowed, v)
}

// NotAcceptable returns 406 Not Acceptable Status Code
func (c apiController) NotAcceptable(v interface{}) {
	c.RootController.JSON(http.StatusNotAcceptable, v)
}

// Conflict returns 409 Conflict Status Code
func (c apiController) Conflict(v interface{}) {
	c.RootController.JSON(http.StatusConflict, v)
}

// UnsupportedMediaType returns 415 Unsupported Media Type Status Code
func (c apiController) UnsupportedMediaType(v interface{}) {
	c.RootController.JSON(http.StatusUnsupportedMediaType, v)
}

// HTTP Status Code Definitions
// Server Error 5xx

// InternalServerError returns  500 Internal Server Error Status Code
func (c apiController) InternalServerError(v interface{}) {
	c.RootController.JSON(http.StatusInternalServerError, v)
}

// ServiceUnavailable returns 503 Service Unavailable Status Code
func (c apiController) ServiceUnavailable(v interface{}) {
	c.RootController.JSON(http.StatusServiceUnavailable, v)
}
