package models

import (
	"github.com/gophergala2016/source/core/foundation"
)

type UserTagRepository struct {
	RootRepository
}

func NewUserTagRepository(ctx foundation.Context) *UserTagRepository {
	return &UserTagRepository{
		RootRepository: NewRootRepository(ctx),
	}
}

func (r *UserTagRepository) FindLatestByUserIDAndCollection(userID uint64, limit, offset int) ([]UserTag, error) {
	var ents []UserTag
	if err := r.Orm.Where("user_id = ?", userID).Limit(limit).Offset(offset).Order("score desc").Find(&ents).Error; err != nil {
		return ents, err
	}
	return ents, nil
}

func (r *UserTagRepository) GetFirstOrCreate(ent *UserTag) (*UserTag, error) {
	if err := r.Orm.Where("user_id = ? AND tag_id = ?", ent.UserID, ent.TagID).FirstOrCreate(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *UserTagRepository) GetByID(userID, tagID uint64) (*UserTag, error) {
	ent := new(UserTag)
	if err := r.Orm.Where("user_id = ? AND tag_id = ?", userID, tagID).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *UserTagRepository) UpdateByID(ent *UserTag) (*UserTag, error) {
	if err := r.Orm.Where("user_id = ? AND tag_id = ?", ent.UserID, ent.TagID).Save(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}
