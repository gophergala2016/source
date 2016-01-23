package foundation

import (
	"bytes"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// TestMiddleware runs
func TestMiddleware(t *testing.T) {
	assert := assert.New(t)

	mw := Middleware{}

	mw.Func = func() {
	}
	assert.Panics(func() {
		mw.HandlerFunc()
	})

	ProdModeClosure(func() {
		assert.NotPanics(func() {
			mw.HandlerFunc()
		})
	})

	mw.Func = func(c *gin.Context) {
	}
	assert.IsType(*new(gin.HandlerFunc), mw.HandlerFunc())

	mw.Func = func(c Context) {
	}
	assert.IsType(*new(gin.HandlerFunc), mw.HandlerFunc())
	assert.NotPanics(func() {
		mw.HandlerFunc()(nil)
	})

	mw = LoggerMiddleware()
	assert.IsType(*new(gin.HandlerFunc), mw.HandlerFunc())
}

// TestLogger runs
func TestLogger(t *testing.T) {
	assert := assert.New(t)

	assert.NotNil(ErrorLoggerMiddleware())
	assert.NotNil(LoggerMiddleware())
	assert.NotNil(LoggerWithWriterMiddleware(new(bytes.Buffer)))
}

// TestRecovery runs
func TestRecovery(t *testing.T) {
	assert := assert.New(t)

	assert.NotNil(RecoveryMiddleware())
}

// TestCookieSession runs
func TestCookieSession(t *testing.T) {
	assert := assert.New(t)

	assert.NotNil(CookieSessionMiddleware(SessionOptions{}, "", []byte("")))
}

// TestSecure runs
func TestSecure(t *testing.T) {
	assert := assert.New(t)

	assert.NotNil(SecureMiddleware(SecureOptions{}))
}
