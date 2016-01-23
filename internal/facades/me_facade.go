package facades

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
	"github.com/gophergala2016/source/internal/services"
)

type MeFacade struct {
	RootFacade
}

func NewMeFacade(ctx foundation.Context) MeFacade {
	return MeFacade{
		RootFacade: NewRootFacade(ctx),
	}
}

func (f MeFacade) LoginMe(name, avatarURL, location string) (*models.User, error) {
	meService := services.NewMeService(f.ctx)
	me, err := meService.GetMeByName(name)
	// Exist me and no error
	if me != nil && err == nil {
		return me, nil
	}
	// Create new user record
	me, err = meService.CreateMe(name, avatarURL, location)
	if err != nil {
		return nil, err
	}
	return me, nil
}

func (f MeFacade) GetMe(accessToken string) (*models.User, error) {
	meService := services.NewMeService(f.ctx)
	return meService.GetMeByAccessToken(accessToken)
}
