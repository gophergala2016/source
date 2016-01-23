package foundationtest

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gophergala2016/source/core/foundation"
)

// TestContext runs
func TestContext(t *testing.T) {
	assert := assert.New(t)

	{
		var (
			ctx1    foundation.Context = NewContext()
			ctx2    foundation.Context = NewContext()
			ctx3    foundation.Context = NewContext()
			ctxptr1 string             = fmt.Sprintf("%p", ctx1)
			ctxptr2 string             = fmt.Sprintf("%p", ctx2)
			ctxptr3 string             = fmt.Sprintf("%p", ctx3)
		)
		assert.NotNil(ctx1)
		assert.NotNil(ctx2)
		assert.NotNil(ctx3)

		assert.NotEqual(ctxptr1, ctxptr2)
		assert.NotEqual(ctxptr2, ctxptr3)
		assert.NotEqual(ctxptr3, ctxptr1)
	}
}
