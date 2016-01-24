package models

import (
	"github.com/gophergala2016/source/core/foundation"
)

type ItemTagRepository struct {
	RootRepository
}

func NewItemTagRepository(ctx foundation.Context) *ItemTagRepository {
	return &ItemTagRepository{
		RootRepository: NewRootRepository(ctx),
	}
}

func (r *ItemTagRepository) FindByItemID(itemID uint64) ([]ItemTag, error) {
	var ents []ItemTag
	if err := r.Orm.Where("item_id = ?", itemID).Find(&ents).Error; err != nil {
		return nil, err
	}
	return ents, nil
}

func (r *ItemTagRepository) FindByItemIDs(itemIDs []uint64) ([]ItemTag, error) {
	var ents []ItemTag
	if err := r.Orm.Where("item_id IN (?)", itemIDs).Find(&ents).Error; err != nil {
		return nil, err
	}
	return ents, nil
}

func (r *ItemTagRepository) Create(ent *ItemTag) (*ItemTag, error) {
	if err := r.Orm.Create(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *ItemTagRepository) UpdateByID(ent *ItemTag) error {
	if err := r.Orm.Where("item_id = ?", ent.ItemID).Save(ent).Error; err != nil {
		return err
	}
	return nil
}
