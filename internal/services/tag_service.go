package services

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
)

type TagService struct {
	RootService
}

func NewTagService(ctx foundation.Context) TagService {
	return TagService{
		RootService: NewRootService(ctx),
	}
}

// GetTagByID get  entity by id from db
func (s TagService) GetTagByID(id uint64) (*models.Tag, error) {
	tagRepository := models.NewTagRepository(s.ctx)
	return tagRepository.GetByID(id)
}

func (s TagService) CreateTag(name, color string) (*models.Tag, error) {
	tag := models.NewTag(name, color)
	tagRepository := models.NewTagRepository(s.ctx)
	return tagRepository.Create(tag)
}
