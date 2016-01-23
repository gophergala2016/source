package facades

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gophergala2016/source/core/foundation/foundationtest"
)

// TestRootFacade
func TestRootFacade(t *testing.T) {
	assert := assert.New(t)

	ctx := foundationtest.NewContext()
	facade := NewRootFacade(ctx)
	assert.NotNil(facade.GetContext())
}
