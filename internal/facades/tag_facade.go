package facades

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
	"github.com/gophergala2016/source/internal/services"
)

type TagFacade struct {
	RootFacade
}

func NewTagFacade(ctx foundation.Context) TagFacade {
	return TagFacade{
		RootFacade: NewRootFacade(ctx),
	}
}

func (f TagFacade) FindPopularTag(limit int) ([]models.Tag, error) {
	tagService := services.NewTagService(f.ctx)
	return tagService.FindPopularTagByCollection(limit, 0)
}
