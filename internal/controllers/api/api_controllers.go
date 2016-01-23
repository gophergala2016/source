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
	//// Apply Request Parameters
	param := parameters.NewGetMeRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	//// Call a facade
	meFacade := facades.NewMeFacade(c.GetContext())
	me, err := meFacade.GetMe(param.GetAccessToken())
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "GetMe::MeFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":   "OK",
		"instance": me,
	})
}

func (c *APIMeController) LoginMe() {
	//// Apply Request Parameters
	param := parameters.NewLoginMeRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	//// Call a facade
	meFacade := facades.NewMeFacade(c.GetContext())
	me, err := meFacade.LoginMe(param.Name, param.AvatarURL, param.Location)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "LoginMe::MeFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":   "OK",
		"instance": me,
	})
}

func (c *APIItemController) GetItem(id string) {
	//// Apply Request Parameters
	param := parameters.NewGetItemRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	// Parse string id to uint64
	uint64ID := c.ParseUint64(id)
	if uint64ID <= 0 {
		return
	}

	//// Call a facade
	itemFacade := facades.NewItemFacade(c.GetContext())
	item, err := itemFacade.GetItemByID(uint64ID)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "GetItemByID::ItemFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":   "OK",
		"instance": item,
	})
}

func (c *APIItemController) GetItemList() {
	//// Apply Request Parameters
	param := parameters.NewGetItemListRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	//// Call a facade
	itemFacade := facades.NewItemFacade(c.GetContext())
	items, err := itemFacade.FindLatestItem(param.Limit)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "FindLatestItem::ItemFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":    "OK",
		"instances": items,
	})
}

func (c *APIItemController) GetItemFavoriteList() {
	//// Apply Request Parameters
	param := parameters.NewGetItemFavoriteListRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	meFacade := facades.NewMeFacade(c.GetContext())
	me, err := meFacade.GetMe(param.GetAccessToken())
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "GetMe::MeFacade",
			"message": err,
		})
		return
	}

	//// Call a facade
	itemFacade := facades.NewItemFacade(c.GetContext())
	items, err := itemFacade.FindFavoriteItem(me.ID, param.Limit)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "FindFavoriteItem::ItemFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":    "OK",
		"instances": items,
	})
}

func (c *APIItemController) CreateItemFavorite(id string) {
	//// Apply Request Parameters
	param := parameters.NewCreateItemFavoriteRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	// Parse string id to uint64
	uint64ID := c.ParseUint64(id)
	if uint64ID <= 0 {
		return
	}

	meFacade := facades.NewMeFacade(c.GetContext())
	me, err := meFacade.GetMe(param.GetAccessToken())
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "GetMe::MeFacade",
			"message": err,
		})
		return
	}

	//// Call a facade
	itemFacade := facades.NewItemFacade(c.GetContext())
	item, err := itemFacade.CreateFavoriteItem(me.ID, uint64ID)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "CreateFavoriteItem::ItemFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":   "OK",
		"instance": item,
	})
}

func (c *APIItemController) CreateItem() {
	//// Apply Request Parameters
	param := parameters.NewCreateItemRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	meFacade := facades.NewMeFacade(c.GetContext())
	me, err := meFacade.GetMe(param.GetAccessToken())
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "GetMe::MeFacade",
			"message": err,
		})
		return
	}

	//// Call a facade
	itemFacade := facades.NewItemFacade(c.GetContext())
	item, err := itemFacade.CreateItem(me.ID, param.GithubURL)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "CreateItem::ItemFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":   "OK",
		"instance": item,
	})
}

func (c *APITagController) GetTagList() {
	//// Apply Request Parameters
	param := parameters.NewGetTagListRequest()
	if ok := c.API().Preprocess(&param); !ok {
		return
	}

	//// Call a facade
	tagFacade := facades.NewTagFacade(c.GetContext())
	tags, err := tagFacade.FindPopularTag(param.Limit)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "FindPopularTag::TagFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":    "OK",
		"instances": tags,
	})
}

func (c *APITagController) CreateTag() {
}
