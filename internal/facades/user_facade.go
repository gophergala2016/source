package facades

import (
	"github.com/gophergala2016/source/core/foundation"
)

type UserFacade struct {
	RootFacade
}

func NewUserFacade(ctx foundation.Context) UserFacade {
	return UserFacade{
		RootFacade: NewRootFacade(ctx),
	}
}

func (f UserFacade) GetUserByID(id interface{}) Result {
	return ResultUser{}
}
