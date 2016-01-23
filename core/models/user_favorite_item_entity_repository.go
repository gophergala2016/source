package models

import (
	"github.com/gophergala2016/source/core/foundation"
)

type UserFavoriteItemRepository struct {
	RootRepository
}

func NewUserFavoriteItemRepository(ctx foundation.Context) *UserFavoriteItemRepository {
	return &UserFavoriteItemRepository{
		RootRepository: NewRootRepository(ctx),
	}
}

func (r *UserFavoriteItemRepository) FindByUserID(userID uint64) ([]UserFavoriteItem, error) {
	var ents []UserFavoriteItem
	if err := r.Orm.Where("user_id = ?", userID).Find(ents).Error; err != nil {
		return nil, err
	}
	return ents, nil
}

func (r *UserFavoriteItemRepository) FindByUserIDAndCollection(userID uint64, limit, offset int) ([]UserFavoriteItem, error) {
	var ents []UserFavoriteItem
	if err := r.Orm.Where("user_id = ?", userID).Limit(limit).Offset(offset).Find(ents).Error; err != nil {
		return nil, err
	}
	return ents, nil
}

func (r *UserFavoriteItemRepository) Create(ent *UserFavoriteItem) (*UserFavoriteItem, error) {
	if err := r.Orm.Create(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}
