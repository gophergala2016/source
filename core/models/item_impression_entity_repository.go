package models

import (
	"github.com/gophergala2016/source/core/foundation"
)

type ItemImpressionRepository struct {
	RootRepository
}

func NewItemImpressionRepository(ctx foundation.Context) *ItemImpressionRepository {
	return &ItemImpressionRepository{
		RootRepository: NewRootRepository(ctx),
	}
}

func (r *ItemImpressionRepository) GetByItemID(itemID uint64) (*ItemImpression, error) {
	ent := new(ItemImpression)
	if err := r.Orm.Where("item_id = ?", itemID).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *ItemImpressionRepository) FindByItemIDs(itemIDs []uint64) ([]ItemImpression, error) {
	var ents []ItemImpression
	if len(itemIDs) == 0 {
		return ents, nil
	}
	if err := r.Orm.Where("item_id IN (?)", itemIDs).Find(&ents).Error; err != nil {
		return ents, err
	}
	return ents, nil
}

func (r *ItemImpressionRepository) Create(ent *ItemImpression) (*ItemImpression, error) {
	if err := r.Orm.Create(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *ItemImpressionRepository) UpdateByID(ent *ItemImpression) error {
	if err := r.Orm.Where("item_id = ?", ent.ItemID).Save(ent).Error; err != nil {
		return err
	}
	return nil
}
