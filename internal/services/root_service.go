package services

import (
	"github.com/gophergala2016/source/core/foundation"
)

type RootService struct {
	ctx foundation.Context
}

func NewRootService(ctx foundation.Context) RootService {
	return RootService{
		ctx: ctx,
	}
}

// GetContext ...
func (s RootService) GetContext() foundation.Context {
	return s.ctx
}
