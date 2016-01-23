package models

import (
	"github.com/gophergala2016/source/core/foundation"
)

type ItemRepository struct {
	RootRepository
}

func NewItemRepository(ctx foundation.Context) *ItemRepository {
	return &ItemRepository{
		RootRepository: NewRootRepository(ctx),
	}
}

func (r *ItemRepository) GetByID(id uint64) (*Item, error) {
	ent := new(Item)
	if err := r.Orm.Where("id = ?", id).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *ItemRepository) Create(ent *Item) (*Item, error) {
	if err := r.Orm.Create(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *ItemRepository) FindByIDs(ids []uint64) ([]Item, error) {
	var ents []Item
	if err := r.Orm.Where("id IN (?)", ids).Find(&ents).Error; err != nil {
		return nil, err
	}
	return ents, nil
}

func (r *ItemRepository) FindByCollection(limit, offset int) ([]Item, error) {
	var ents []Item
	if err := r.Orm.Limit(limit).Offset(offset).Find(&ents).Error; err != nil {
		return nil, err
	}
	return ents, nil
}
