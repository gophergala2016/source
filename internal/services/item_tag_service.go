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

func (s ItemTagService) FindItemTagByID(itemID uint64) ([]models.ItemTag, error) {
	itemTagRepository := models.NewItemTagRepository(s.ctx)
	return itemTagRepository.FindByItemID(itemID)
}

func (s ItemTagService) FindItemTagByIDs(itemIDs []uint64) ([]models.ItemTag, error) {
	itemTagRepository := models.NewItemTagRepository(s.ctx)
	return itemTagRepository.FindByItemIDs(itemIDs)
}

func (s ItemTagService) CreateItemTag(itemID, tagID uint64) (*models.ItemTag, error) {
	itemTag := models.NewItemTag(itemID, tagID)
	itemTagRepository := models.NewItemTagRepository(s.ctx)
	return itemTagRepository.Create(itemTag)
}
