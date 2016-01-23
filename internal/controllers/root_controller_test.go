package controllers

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestController runs
func TestController(t *testing.T) {
	assert := assert.New(t)

	assert.Implements((*APIController)(nil), new(apiController))
	assert.Implements((*WebController)(nil), new(webController))
}

// TestRootController runs
func TestRootController(t *testing.T) {
	assert := assert.New(t)

	controller := RootController{}
	assert.Nil(controller.apiController)
	assert.Nil(controller.webController)

	assert.NotNil(controller.API())
	assert.NotNil(controller.Web())

	assert.NotNil(controller.apiController)
	assert.NotNil(controller.webController)
}
