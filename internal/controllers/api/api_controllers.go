package api

import (
	"github.com/gophergala2016/source/internal/facades"
	"github.com/gophergala2016/source/internal/modules/parameters"
)

type APIUserController struct {
	APIRootController
}

type APIMeController struct {
	APIRootController
}

type APIItemController struct {
	APIRootController
}

type APITagController struct {
	APIRootController
}

func (c APIUserController) GetUser(id string) {
	//// Apply Request Parameters
	param := parameters.NewGetUserRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	// Parse string id to uint64
	uint64ID := c.ParseUint64(id)
	if uint64ID <= 0 {
		return
	}

	//// Call a facade
	userFacade := facades.NewUserFacade(c.GetContext())
	user, err := userFacade.GetUserByID(uint64ID)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "GetUser::UserFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":   "OK",
		"instance": user,
	})
}

func (c *APIMeController) GetMe() {
}

func (c *APIMeController) LoginMe() {
}

func (c *APIItemController) GetItem(id string) {
}

func (c *APIItemController) GetItemList() {
}

func (c *APIItemController) GetItemFavoriteList() {
}

func (c *APIItemController) CreateItemFavorite(id string) {
}

func (c *APIItemController) CreateItem() {
}

func (c *APITagController) GetTagList() {
}

func (c *APITagController) CreateTag() {
}
