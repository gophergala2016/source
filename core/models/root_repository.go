package models

import (
	"github.com/jinzhu/gorm"

	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/net/context/accessor"
)

// RootRepository is base struct for repository
type RootRepository struct {
	Ctx foundation.Context
	Orm *gorm.DB
}

// NewRootRepository creates new NewRootRepository
func NewRootRepository(ctx foundation.Context) RootRepository {
	r := RootRepository{}
	r.Ctx = ctx
	r.Orm = accessor.GetDatabase(ctx)
	return r
}
