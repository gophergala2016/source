package facades

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
	"github.com/gophergala2016/source/internal/services"
)

type UserFacade struct {
	RootFacade
}

func NewUserFacade(ctx foundation.Context) UserFacade {
	return UserFacade{
		RootFacade: NewRootFacade(ctx),
	}
}

func (f UserFacade) GetUserByID(id uint64) (*models.User, error) {
	userService := services.NewUserService(f.ctx)
	return userService.GetUserByID(id)
}
