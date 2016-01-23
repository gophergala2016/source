package api

import (
	"github.com/gophergala2016/source/core/net/context/accessor"
)

type APIUserController struct {
	APIRootController
}

func (c APIUserController) GetUser(id string) {
	//// Apply Request Parameters
	// param := parameters.NewGetUserRequest()
	// if ok := c.API().Preprocess(&param); !ok {
	// 	return
	//}

	//// Call a facade
	// e.g.) f := facades.NewUserFacade(c.GetContext())

	// Render result
	c.API().OK(map[string]interface{}{
		"status":  "ok",
		"handler": accessor.GetAction(c.GetContext()),
		"message": "APIUserController.GetUser",
	})
}
