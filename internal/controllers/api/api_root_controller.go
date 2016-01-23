package api

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/internal/controllers"
)

// APIRootController is
type APIRootController struct {
	controllers.RootController
}

// SetContext sets foundation.Context to initialize controller.
func (c *APIRootController) SetContext(ctx foundation.Context) {
	c.API()
	c.RootController.SetContext(ctx)
}
