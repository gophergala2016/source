package main

import (
	"strings"

	"github.com/gophergala2016/source/core/config"

	"github.com/gophergala2016/source/core/foundation"
)

func init() {
	// Template delimiters
	delims := strings.Fields(config.GetView().Template.Delimiters)
	foundation.Template.Delims.Left, foundation.Template.Delims.Right = delims[0], delims[1]

	// Template filters
	foundation.Template.Filters = []foundation.Filter{
		foundation.Newline2BreakFilter(),
		foundation.RawFilter(),
	}

	// Request Middlewares
	foundation.Middlewares = []foundation.Middleware{
		foundation.RecoveryMiddleware(),
		foundation.LoggerMiddleware(),
		CookieSessionMiddleware(),
		SecureMiddleware(),
		ResponseHeaderMiddleware(),
		foundation.DebugPrintHeaderMiddleware(),
		DebugMiddleware(),
	}
}

/////////////////////////////////////////////////
////////// Middlewares (for Request))
/////////////////////////////////////////////////

var DebugMiddleware = func() foundation.Middleware {
	mw := foundation.Middleware{
		Func: func(ctx foundation.Context) {
			req := ctx.Request()
			foundation.DebugPrintf("Request ClientIP: %s\n", req.ClientIP())
			foundation.DebugPrintf("Request User-Agent: %s\n", req.UserAgent())
			ctx.Operation().Next()
		},
	}
	return mw
}

var CookieSessionMiddleware = func() foundation.Middleware {
	opt := foundation.SessionOptions{
		Secure:   false,
		HttpOnly: false,
	}
	name, secret := config.GetApp().Name, config.GetApp().Secret
	return foundation.CookieSessionMiddleware(opt, name, []byte(secret))
}

var SecureMiddleware = func() foundation.Middleware {
	opt := foundation.SecureOptions{
		ContentTypeNosniff: true,
		BrowserXssFilter:   true,
	}
	return foundation.SecureMiddleware(opt)
}

var ResponseHeaderMiddleware = func() foundation.Middleware {
	return foundation.Middleware{
		Func: func(ctx foundation.Context) {
			resp := ctx.Response()
			resp.Header().Add(`Cache-Control`, `no-cache, no-store, max-age=0, must-revalidate`)
			resp.Header().Add(`Expires`, `-1`)
			resp.Header().Add(`Pragma`, `no-cache`)
			resp.Header().Add(`P3P`,
				`CP="IDC DSP COR ADM DEVi TAIi PSA PSD IVAi IVDi CONi HIS OUR IND CNT"`)
		},
	}
}
