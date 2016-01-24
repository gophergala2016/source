package services

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
)

type UserService struct {
	RootService
}

func NewUserService(ctx foundation.Context) UserService {
	return UserService{
		RootService: NewRootService(ctx),
	}
}

// GetUserByID get user entity by id from db
func (s UserService) GetUserByID(id uint64) (*models.User, error) {
	userRepository := models.NewUserRepository(s.ctx)
	return userRepository.GetByID(id)
}

func (s UserService) FindUserByIDs(ids []uint64) ([]models.User, error) {
	userRepository := models.NewUserRepository(s.ctx)
	return userRepository.FindByIDs(ids)
}
