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

func (r *ItemRepository) GetByID(iid uint64) (*Item, error) {
	ent := new(Item)
	if err := r.Orm.Where("id = ?", iid).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}
