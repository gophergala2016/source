package models

import (
	"github.com/gophergala2016/source/core/foundation"
)

type TagRepository struct {
	RootRepository
}

func NewTagRepository(ctx foundation.Context) *TagRepository {
	return &TagRepository{
		RootRepository: NewRootRepository(ctx),
	}
}

func (r *TagRepository) GetByItemID(id uint64) (*Tag, error) {
	ent := new(Tag)
	if err := r.Orm.Where("id = ?", id).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *TagRepository) Create(ent *Tag) (*Tag, error) {
	if err := r.Orm.Create(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *TagRepository) UpdateByID(ent *Tag) (*Tag, error) {
	if err := r.Orm.Where("id = ?", ent.ID).Save(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}
