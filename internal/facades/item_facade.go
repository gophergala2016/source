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

func (f ItemFacade) CreateItem(userID uint64, githubURL string) (*models.Item, error) {
	itemService := services.NewItemService(f.ctx)
	return itemService.CreateItem(userID, githubURL)
}

func (f ItemFacade) FindLatestItem(limit int) ([]models.Item, error) {
	itemService := services.NewItemService(f.ctx)
	return itemService.FindLatestItemByCollection(limit, 0)
}
