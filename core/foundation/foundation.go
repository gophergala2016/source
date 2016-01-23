package foundation

import (
	"os"

	"github.com/gin-gonic/gin"
)

type (
	// Engine is
	Engine struct {
		core *gin.Engine
	}

	// IRoutes is
	IRoutes gin.IRoutes
)

var (
	BasePath string
)

const ENV_SOURCE_ROOT = "SOURCE_ROOT"

func init() {
	BasePath = os.Getenv(ENV_SOURCE_ROOT)
	if len(BasePath) == 0 {
		dir, err := os.Getwd()
		if err != nil {
			Panic(err)
		}
		BasePath = dir
	}
}

// New returns a new blank Engine instance without any middleware attached.
// By default the configuration is:
func New() *Engine {
	return &Engine{
		core: gin.New(),
	}
}

// Default returns an Engine instance with the Logger and Recovery middleware already attached.
func Default() *Engine {
	engine := New()
	var mws []gin.HandlerFunc
	if len(Middlewares) > 0 {
		mws = make([]gin.HandlerFunc, len(Middlewares))
		for i := 0; i < len(Middlewares); i++ {
			mws[i] = Middlewares[i].HandlerFunc()
		}
	} else {
		mws = []gin.HandlerFunc{
			RecoveryMiddleware().HandlerFunc(),
			LoggerMiddleware().HandlerFunc(),
		}
	}
	engine.Use(mws...)
	return engine
}

// Attachs a global middleware to the router.
func (engine *Engine) Use(middleware ...gin.HandlerFunc) IRoutes {
	engine.core.Use(middleware...)
	return engine.core
}

// Static serves files from the given file system root.
// Internally a http.FileServer is used, therefore http.NotFound is used instead
// of the Router's NotFound handler.
// To use the operating system's file system implementation,
// use :
//     router.Static("/static", "/var/www")
func (engine *Engine) Static(relativePath, root string) IRoutes {
	return engine.core.Static(relativePath, root)
}

// LoadHTMLGlob loads
func (engine *Engine) LoadHTMLGlob(relativePath, pattern string) {
	templ, err := parseGlob(nil, relativePath, pattern)
	if err != nil {
		Panic(err)
	}
	engine.core.SetHTMLTemplate(templ)
}

// Group creates a new router group. You should add all the routes that have common middlwares or the same path prefix.
// For example, all the routes that use a common middlware for authorization could be grouped.
func (engine *Engine) Group(relativePath string, handlers ...gin.HandlerFunc) *gin.RouterGroup {
	return engine.core.Group(relativePath, handlers...)
}

// POST is a shortcut for router.Handle("POST", path, handle)
func (engine *Engine) POST(relativePath string, handlers ...gin.HandlerFunc) IRoutes {
	return engine.core.POST(relativePath, handlers...)
}

// GET is a shortcut for router.Handle("GET", path, handle)
func (engine *Engine) GET(relativePath string, handlers ...gin.HandlerFunc) IRoutes {
	return engine.core.GET(relativePath, handlers...)
}

// DELETE is a shortcut for router.Handle("DELETE", path, handle)
func (engine *Engine) DELETE(relativePath string, handlers ...gin.HandlerFunc) IRoutes {
	return engine.core.DELETE(relativePath, handlers...)
}

// PATCH is a shortcut for router.Handle("PATCH", path, handle)
func (engine *Engine) PATCH(relativePath string, handlers ...gin.HandlerFunc) IRoutes {
	return engine.core.PATCH(relativePath, handlers...)
}

// PUT is a shortcut for router.Handle("PUT", path, handle)
func (engine *Engine) PUT(relativePath string, handlers ...gin.HandlerFunc) IRoutes {
	return engine.core.PUT(relativePath, handlers...)
}

// Run attaches the router to a http.Server and starts listening and serving HTTP requests.
// It is a shortcut for http.ListenAndServe(addr, router)
// Note: this method will block the calling goroutine undefinitelly unless an error happens.
func (engine *Engine) Run(addr ...string) (err error) {
	err = engine.core.Run(addr...)
	return
}

// RunTLS attaches the router to a http.Server and starts listening and serving HTTPS (secure) requests.
// It is a shortcut for http.ListenAndServeTLS(addr, certFile, keyFile, router)
// Note: this method will block the calling goroutine undefinitelly unless an error happens.
func (engine *Engine) RunTLS(addr string, certFile string, keyFile string) (err error) {
	err = engine.core.RunTLS(addr, certFile, keyFile)
	return
}

// RunUnix attaches the router to a http.Server and starts listening and serving HTTP requests
// through the specified unix socket (ie. a file).
// Note: this method will block the calling goroutine undefinitelly unless an error happens.
func (engine *Engine) RunUnix(file string) (err error) {
	err = engine.core.RunUnix(file)
	return
}
