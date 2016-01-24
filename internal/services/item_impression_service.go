package services

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
)

type ItemImpressionService struct {
	RootService
}

func NewItemImpressionService(ctx foundation.Context) ItemImpressionService {
	return ItemImpressionService{
		RootService: NewRootService(ctx),
	}
}

// GetItemImpressionByID get item entity by id from db
func (s ItemImpressionService) GetItemImpressionByID(itemID uint64) (*models.ItemImpression, error) {
	itemImpRepository := models.NewItemImpressionRepository(s.ctx)
	return itemImpRepository.GetByItemID(itemID)
}

func (s ItemImpressionService) FindItemImpressionByIDs(itemIDs []uint64) ([]models.ItemImpression, error) {
	itemImpRepository := models.NewItemImpressionRepository(s.ctx)
	return itemImpRepository.FindByItemIDs(itemIDs)
}

func (s ItemImpressionService) CreateItemImpression(itemID uint64, star uint) (*models.ItemImpression, error) {
	itemImp := models.NewItemImpression(itemID, star)
	itemImpRepository := models.NewItemImpressionRepository(s.ctx)
	return itemImpRepository.Create(itemImp)
}

func (s ItemImpressionService) UpdateItemImpressionViewByID(itemID uint64, view uint) error {
	itemImpRepository := models.NewItemImpressionRepository(s.ctx)
	return itemImpRepository.UpdateCountByID(itemID, view)
}
