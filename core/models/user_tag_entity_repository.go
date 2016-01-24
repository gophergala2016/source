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
