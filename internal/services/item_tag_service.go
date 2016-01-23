package services

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
)

type ItemTagService struct {
	RootService
}

func NewItemTagService(ctx foundation.Context) ItemTagService {
	return ItemTagService{
		RootService: NewRootService(ctx),
	}
}

// GetItemTagByID get item entity by id from db
func (s ItemTagService) GetItemTagByID(itemID uint64) (*models.ItemTag, error) {
	itemTagRepository := models.NewItemTagRepository(s.ctx)
	return itemTagRepository.GetByItemID(itemID)
}

func (s ItemTagService) CreateItemTag(itemID, tagID uint64) (*models.ItemTag, error) {
	itemTag := models.NewItemTag(itemID, tagID)
	itemTagRepository := models.NewItemTagRepository(s.ctx)
	return itemTagRepository.Create(itemTag)
}
