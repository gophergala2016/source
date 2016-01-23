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

func (s ItemService) CreateItem(userID uint64, githubURL string) (*models.Item, error) {
	item := models.NewItem(userID, githubURL)
	itemRepository := models.NewItemRepository(s.ctx)
	return itemRepository.Create(item)
}

func (s ItemService) FindItemByIDs(ids []uint64) ([]models.Item, error) {
	itemRepository := models.NewItemRepository(s.ctx)
	return itemRepository.FindByIDs(ids)
}

func (s ItemService) FindItemByCollection(limit, offset int) ([]models.Item, error) {
	itemRepository := models.NewItemRepository(s.ctx)
	return itemRepository.FindByCollection(limit, offset)
}
