package accessor

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/foundation/foundationtest"
)

// TestAccessor
func TestAccessor(t *testing.T) {
	assert := assert.New(t)

	var ctx foundation.Context
	ctx = foundationtest.NewContext()

	var action string
	action = GetAction(ctx)
	assert.Equal("", action)
	SetAction(ctx, "foo.Bar()")
	action = GetAction(ctx)
	assert.Equal("foo.Bar()", action)
}
