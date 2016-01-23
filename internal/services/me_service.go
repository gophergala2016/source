package services

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
	"github.com/gophergala2016/source/internal/modules/parameters/accesstoken"
)

type MeService struct {
	RootService
}

func NewMeService(ctx foundation.Context) MeService {
	return MeService{
		RootService: NewRootService(ctx),
	}
}

// GetMeByAccessToken get user entity by accessToken from db
func (s MeService) GetMeByAccessToken(accessToken string) (*models.User, error) {
	userRepository := models.NewUserRepository(s.ctx)
	return userRepository.GetByAccessToken(accessToken)
}

// GetMeByName get user entity by name from db
func (s MeService) GetMeByName(name string) (*models.User, error) {
	userRepository := models.NewUserRepository(s.ctx)
	return userRepository.GetByName(name)
}

// CreateMe new user
func (s MeService) CreateMe(name, avatarURL, location string) (*models.User, error) {
	token := accesstoken.Generate(accesstoken.GenerateRandomKey(32))
	user := models.NewUser(name, avatarURL, location, token.String())
	userRepository := models.NewUserRepository(s.ctx)
	return userRepository.Create(user)
}
