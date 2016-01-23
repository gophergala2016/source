package services

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gophergala2016/source/core/foundation/foundationtest"
)

// TestRootService
func TestRootService(t *testing.T) {
	assert := assert.New(t)

	ctx := foundationtest.NewContext()
	service := NewRootService(ctx)
	assert.NotNil(service.GetContext())
}
