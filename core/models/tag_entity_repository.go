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

func (r *TagRepository) GetByID(id uint64) (*Tag, error) {
	ent := new(Tag)
	if err := r.Orm.Where("id = ?", id).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *TagRepository) FindByNames(names []string) ([]Tag, error) {
	var ents []Tag
	if err := r.Orm.Where("name IN (?)", names).Find(&ents).Error; err != nil {
		return ents, err
	}
	return ents, nil
}

func (r *TagRepository) Create(ent *Tag) (*Tag, error) {
	if err := r.Orm.Create(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *TagRepository) UpdateByID(ent *Tag) error {
	if err := r.Orm.Where("id = ?", ent.ID).Save(ent).Error; err != nil {
		return err
	}
	return nil
}

func (r *TagRepository) FindLatestByCollection(limit, offset int) ([]Tag, error) {
	var ents []Tag
	if err := r.Orm.Limit(limit).Offset(offset).Order("created_at desc").Find(&ents).Error; err != nil {
		return ents, err
	}
	return ents, nil
}

func (r *TagRepository) FindPopularByCollection(limit, offset int) ([]Tag, error) {
	var ents []Tag
	if err := r.Orm.Limit(limit).Offset(offset).Order("score desc").Find(&ents).Error; err != nil {
		return ents, err
	}
	return ents, nil
}
