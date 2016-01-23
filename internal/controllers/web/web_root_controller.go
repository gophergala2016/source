package web

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/internal/controllers"
)

// WebRootController is
type WebRootController struct {
	controllers.RootController
}

// SetContext sets foundation.Context to initialize controller.
func (c *WebRootController) SetContext(ctx foundation.Context) {
	c.Web()
	c.RootController.SetContext(ctx)
}
