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

func (f UserFacade) FindUserMap(ids []uint64) (map[uint64]models.User, error) {
	userService := services.NewUserService(f.ctx)
	users, err := userService.FindUserByIDs(ids)
	if err != nil {
		return nil, err
	}
	res := make(map[uint64]models.User, len(users))
	for _, user := range users {
		res[user.ID] = user
	}
	return res, nil
}
