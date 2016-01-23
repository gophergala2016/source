package models

import (
	"github.com/gophergala2016/source/core/foundation"
)

type UserRepository struct {
	RootRepository
}

func NewUserRepository(ctx foundation.Context) *UserRepository {
	return &UserRepository{
		RootRepository: NewRootRepository(ctx),
	}
}

func (r *UserRepository) GetByID(uid uint64) (*User, error) {
	ent := new(User)
	if err := r.Orm.Where("id = ?", uid).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}
