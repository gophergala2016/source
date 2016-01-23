package gintest

import (
	"fmt"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// TestContext runs
func TestContext(t *testing.T) {
	assert := assert.New(t)

	{
		var (
			ctx1    *gin.Context = SharedContext()
			ctx2    *gin.Context = SharedContext()
			ctx3    *gin.Context = SharedContext()
			ctxptr1 string       = fmt.Sprintf("%p", ctx1)
			ctxptr2 string       = fmt.Sprintf("%p", ctx2)
			ctxptr3 string       = fmt.Sprintf("%p", ctx3)
		)
		if assert.NotNil(ctx1) {
			assert.Nil(ctx1.Request)
		}
		if assert.NotNil(ctx2) {
			assert.Nil(ctx2.Request)
		}
		if assert.NotNil(ctx3) {
			assert.Nil(ctx3.Request)
		}

		assert.NotEqual(ctxptr1, ctxptr2)
		assert.NotEqual(ctxptr2, ctxptr3)
		assert.NotEqual(ctxptr3, ctxptr1)
	}

	Init()

	{
		var (
			ctx1    *gin.Context = SharedContext()
			ctx2    *gin.Context = SharedContext()
			ctx3    *gin.Context = SharedContext()
			ctxptr1 string       = fmt.Sprintf("%p", ctx1)
			ctxptr2 string       = fmt.Sprintf("%p", ctx2)
			ctxptr3 string       = fmt.Sprintf("%p", ctx3)
			ptr1    string       = fmt.Sprintf("%p", ctx1.Request)
			ptr2    string       = fmt.Sprintf("%p", ctx2.Request)
			ptr3    string       = fmt.Sprintf("%p", ctx3.Request)
		)
		if assert.NotNil(ctx1) {
			assert.NotNil(ctx1.Request)
		}
		if assert.NotNil(ctx2) {
			assert.NotNil(ctx2.Request)
		}
		if assert.NotNil(ctx3) {
			assert.NotNil(ctx3.Request)
		}

		assert.Equal(ctxptr1, ctxptr2)
		assert.Equal(ctxptr2, ctxptr3)
		assert.Equal(ctxptr3, ctxptr1)

		assert.Equal(ptr1, ptr2)
		assert.Equal(ptr2, ptr3)
		assert.Equal(ptr3, ptr1)
	}
}
