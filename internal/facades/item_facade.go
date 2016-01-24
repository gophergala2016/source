package facades

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
	"github.com/gophergala2016/source/internal/services"
)

type ItemFacade struct {
	RootFacade
}

func NewItemFacade(ctx foundation.Context) ItemFacade {
	return ItemFacade{
		RootFacade: NewRootFacade(ctx),
	}
}

func (f ItemFacade) GetItemByID(id uint64) (*models.Item, error) {
	itemService := services.NewItemService(f.ctx)
	return itemService.GetItemByID(id)
}

func (f ItemFacade) CreateItem(userID uint64, githubURL string) (item *models.Item, err error) {

	item = models.NewItem(userID, githubURL)

	// Get github info
	var github *models.Github
	githubService := services.NewGithubService()
	if github, err = githubService.GetGithub(githubURL); err != nil {
		return nil, err
	}

	{
		// Item
		itemService := services.NewItemService(f.ctx)
		item.Author = github.Author
		item.Name = github.Name
		item.Description = github.Description
		if item, err = itemService.CreateItem(item); err != nil {
			return nil, err
		}
	}

	{
		// Star
		itemImpressionService := services.NewItemImpressionService(f.ctx)
		if _, err = itemImpressionService.CreateItemImpression(item.ID, uint(github.Star)); err != nil {
			return nil, err
		}
	}

	{
		// Tag
		var tags []models.Tag
		tagService := services.NewTagService(f.ctx)
		if tags, err = tagService.FindTagByNames(github.Languages); err != nil {
			return nil, err
		}

		itemTagService := services.NewItemTagService(f.ctx)
		for _, tag := range tags {
			if _, err = itemTagService.CreateItemTag(item.ID, tag.ID); err != nil {
				return nil, err
			}
		}
	}

	return
}

func (f ItemFacade) FindLatestItem(limit int) ([]models.Item, error) {
	itemService := services.NewItemService(f.ctx)
	return itemService.FindLatestItemByCollection(limit, 0)
}

func (f ItemFacade) CreateFavoriteItem(userID, itemID uint64) (*models.Item, error) {
	userFavItemService := services.NewUserFavoriteItemService(f.ctx)
	_, err := userFavItemService.CreateUserFavoriteItem(userID, itemID)
	if err != nil {
		return nil, err
	}
	itemService := services.NewItemService(f.ctx)
	return itemService.GetItemByID(itemID)
}

func (f ItemFacade) FindFavoriteItem(userID uint64, limit int) ([]models.Item, error) {
	userFavItemService := services.NewUserFavoriteItemService(f.ctx)
	userFavItems, err := userFavItemService.FindLatestUserFavoriteItemByCollection(userID, limit, 0)
	if err != nil {
		return nil, err
	}
	itemIDs := make([]uint64, len(userFavItems))
	for i, userFavItem := range userFavItems {
		itemIDs[i] = userFavItem.ItemID
	}
	itemService := services.NewItemService(f.ctx)
	return itemService.FindItemByIDs(itemIDs)
}
