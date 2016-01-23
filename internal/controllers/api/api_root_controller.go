package api

import (
	"strconv"

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

// ParseUint64 convert string to uint64
func (c *APIRootController) ParseUint64(str string) uint64 {
	res, err := strconv.ParseUint(str, 10, 64)
	if err != nil {
		c.API().BadRequest(map[string]interface{}{
			"status":  "NG",
			"func":    "ParseUint64::APIRootController",
			"message": err,
		})
		return 0
	}
	return res
}
