package api

import (
	"github.com/gophergala2016/source/core/models"
	"github.com/gophergala2016/source/internal/facades"
	"github.com/gophergala2016/source/internal/modules/parameters"
	"github.com/gophergala2016/source/internal/modules/responses"
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

	itemFacade := facades.NewItemFacade(c.GetContext())
	// Parse string id to uint64
	uint64ID := c.ParseUint64(id)
	if uint64ID <= 0 {
		return
	}

	if err := itemFacade.UpdateItemImpressionView(uint64ID); err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "UpdateItemImpressionCount::ItemFacade",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status": "OK",
	})
}

func (c *APIItemController) ConvertItems(items []models.Item) ([]responses.ItemResponse, error) {
	itemFacade := facades.NewItemFacade(c.GetContext())

	// Get only item ids
	itemIDs := make([]uint64, len(items))
	itemUserIDs := make([]uint64, len(items))
	for i, item := range items {
		itemIDs[i] = item.ID
		itemUserIDs[i] = item.UserID
	}

	itemImpressionMap, err := itemFacade.FindItemImpressionMap(itemIDs)
	if err != nil {
		return nil, err
	}

	itemTagIDsMap, err := itemFacade.FindItemTagIDsMap(itemIDs)
	if err != nil {
		return nil, err
	}

	userFacade := facades.NewUserFacade(c.GetContext())
	itemUserMap, err := userFacade.FindUserMap(itemUserIDs)
	if err != nil {
		return nil, err
	}

	// Make a response
	itemResponseList := make([]responses.ItemResponse, len(items))
	for i, item := range items {
		itemResponse := responses.NewItemResponse(
			item.ID,
			item.GithubURL,
			item.Author,
			item.Name,
			item.Description,
			item.CreatedAt,
		)
		itemImpression := itemImpressionMap[item.ID]
		itemResponse.SetImpression(itemImpression.View, itemImpression.Star)

		itemUser := itemUserMap[item.ID]
		itemResponse.SetUser(responses.NewUserResponse(itemUser.Name, itemUser.AvatarURL))

		itemTagIDs := itemTagIDsMap[item.ID]
		tagFacade := facades.NewTagFacade(c.GetContext())
		tags, _ := tagFacade.FindTagByIDs(itemTagIDs)
		for _, tag := range tags {
			itemResponse.AppendTag(responses.NewTagResponse(tag.Name, tag.Color))
		}

		itemResponseList[i] = itemResponse
	}

	return itemResponseList, nil
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

	itemResponseList, err := c.ConvertItems(items)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "ConvertItems::ItemController",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":    "OK",
		"instances": itemResponseList,
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

	itemResponseList, err := c.ConvertItems(items)
	if err != nil {
		c.API().InternalServerError(map[string]interface{}{
			"status":  "NG",
			"func":    "ConvertItems::ItemController",
			"message": err,
		})
		return
	}

	// Render result
	c.API().OK(map[string]interface{}{
		"status":    "OK",
		"instances": itemResponseList,
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
			"message": err.Error(),
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
			"message": err.Error(),
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
