package foundation

import (
	"io"

	"github.com/gin-gonic/contrib/secure"
	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

type (
	Middleware struct {
		Func interface{}
	}
	SessionOptions sessions.Options
	SecureOptions  secure.Options
)

var (
	Middlewares []Middleware = []Middleware{}
)

func (mw Middleware) HandlerFunc() gin.HandlerFunc {
	switch mw.Func.(type) {
	case func(*gin.Context):
		return (mw.Func).(func(*gin.Context))
	case gin.HandlerFunc:
		return (mw.Func).(gin.HandlerFunc)
	case func(Context):
		return func(c *gin.Context) {
			(mw.Func.(func(Context)))(NewContext(c))
		}
	}
	Panic("Error: middleware the type of function is wrong.")
	return func(c *gin.Context) { c.Next() }
}

func ErrorLoggerMiddleware() Middleware {
	return Middleware{Func: gin.ErrorLogger()}
}

func LoggerMiddleware() Middleware {
	return Middleware{Func: gin.Logger()}
}

func LoggerWithWriterMiddleware(out io.Writer) Middleware {
	return Middleware{Func: gin.LoggerWithWriter(out)}
}

// Recovery returns a middleware that recovers from any panics and writes a 500 if there was one.
func RecoveryMiddleware() Middleware {
	return Middleware{Func: gin.Recovery()}
}

// CookieSessionMiddleware returns Middleware of CookieSession
func CookieSessionMiddleware(opt SessionOptions, name string, keyPairs ...[]byte) Middleware {
	store := sessions.NewCookieStore(keyPairs...)
	store.Options(sessions.Options(opt))
	return Middleware{Func: sessions.Sessions(name, store)}
}

// SecureMiddleware returns Middleware of Secure
func SecureMiddleware(opt SecureOptions) Middleware {
	return Middleware{Func: secure.Secure(secure.Options(opt))}
}

func DebugPrintHeaderMiddleware() Middleware {
	return Middleware{
		Func: func(ctx *gin.Context) {
			reqHeader := ctx.Request.Header
			DebugPrintf("%s Request Header: %v\n", ctx.HandlerName(), reqHeader)
			ctx.Next()
			respHeader := ctx.Writer.Header()
			DebugPrintf("Response Header: %v\n", respHeader)
		},
	}
}
