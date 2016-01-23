package facades

import (
	"github.com/gophergala2016/source/core/foundation"
)

// RootFacade is
type RootFacade struct {
	ctx foundation.Context
}

// NewRootFacade returns initialized RootFacade
func NewRootFacade(ctx foundation.Context) RootFacade {
	return RootFacade{
		ctx: ctx,
	}
}

// GetContext ...
func (f RootFacade) GetContext() foundation.Context {
	return f.ctx
}
