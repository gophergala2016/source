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

func (f ItemFacade) CreateItem(userID uint64, githubURL string) (*models.Item, error) {
	itemService := services.NewItemService(f.ctx)
	return itemService.CreateItem(userID, githubURL)
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
