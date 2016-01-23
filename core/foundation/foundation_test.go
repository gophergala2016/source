package foundation

import (
	"testing"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

// TestEngine runs
func TestEngine(t *testing.T) {
	assert := assert.New(t)

	var engine *Engine
	assert.Nil(engine)

	engine = New()
	assert.NotNil(engine)

	engine = Default()
	assert.NotNil(engine)

	Middlewares = []Middleware{
		RecoveryMiddleware(),
		RecoveryMiddleware(),
	}
	engine = Default()
	assert.NotNil(engine)

	assert.NotNil(engine.Static("", ""))
	assert.Panics(func() {
		engine.LoadHTMLGlob("", "")
	})

	handler := func(c *gin.Context) {}
	assert.NotNil(engine.Group("/test", handler))
	assert.Implements((*IRoutes)(nil), engine.POST("/test/post", handler))
	assert.Panics(func() {
		// panic: path segment '/' conflicts with existing wildcard '/*filepath' in path '/'
		engine.GET("/test/get", handler)
	})
	assert.Implements((*IRoutes)(nil), engine.DELETE("/test/delete", handler))
	assert.Implements((*IRoutes)(nil), engine.PATCH("/test/patch", handler))
	assert.Implements((*IRoutes)(nil), engine.PUT("/test/put", handler))

	go func() {
		assert.NoError(engine.Run(":8123"))
	}()
	go func() {
		// Because: no such file or directory
		assert.Error(engine.RunTLS(":8133", "cert", "key"))
	}()
	go func() {
		assert.NoError(engine.RunUnix("/tmp/unix.sock"))
	}()
	time.Sleep(100 * time.Millisecond)
}
