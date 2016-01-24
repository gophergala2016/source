package services

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
)

type ItemService struct {
	RootService
}

func NewItemService(ctx foundation.Context) ItemService {
	return ItemService{
		RootService: NewRootService(ctx),
	}
}

// GetItemByID get item entity by id from db
func (s ItemService) GetItemByID(id uint64) (*models.Item, error) {
	itemRepository := models.NewItemRepository(s.ctx)
	return itemRepository.GetByID(id)
}

func (s ItemService) CreateItem(item *models.Item) (*models.Item, error) {
	itemRepository := models.NewItemRepository(s.ctx)
	return itemRepository.Create(item)
}

func (s ItemService) FindItemByIDs(ids []uint64) ([]models.Item, error) {
	itemRepository := models.NewItemRepository(s.ctx)
	return itemRepository.FindByIDs(ids)
}

func (s ItemService) FindLatestItemByCollection(limit, offset int) ([]models.Item, error) {
	itemRepository := models.NewItemRepository(s.ctx)
	return itemRepository.FindLatestByCollection(limit, offset)
}
