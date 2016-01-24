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

func (r *UserRepository) GetByID(id uint64) (*User, error) {
	ent := new(User)
	if err := r.Orm.Where("id = ?", id).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *UserRepository) FindByIDs(ids []uint64) ([]User, error) {
	var ents []User
	if err := r.Orm.Where("id IN (?)", ids).Find(&ents).Error; err != nil {
		return ents, err
	}
	return ents, nil
}

func (r *UserRepository) GetByAccessToken(token string) (*User, error) {
	ent := new(User)
	if err := r.Orm.Where("access_token = ?", token).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *UserRepository) GetByName(name string) (*User, error) {
	ent := new(User)
	if err := r.Orm.Where("name = ?", name).First(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}

func (r *UserRepository) Create(ent *User) (*User, error) {
	if err := r.Orm.Create(ent).Error; err != nil {
		return nil, err
	}
	return ent, nil
}
