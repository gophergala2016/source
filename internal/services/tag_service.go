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

func (s TagService) FindTagByIDs(ids []uint64) ([]models.Tag, error) {
	tagRepository := models.NewTagRepository(s.ctx)
	return tagRepository.FindByIDs(ids)
}

func (s TagService) FindTagByNames(names []string) ([]models.Tag, error) {
	tagRepository := models.NewTagRepository(s.ctx)
	return tagRepository.FindByNames(names)
}

func (s TagService) CreateTag(name, color string, score uint) (*models.Tag, error) {
	tag := models.NewTag(name, color, score)
	tagRepository := models.NewTagRepository(s.ctx)
	return tagRepository.Create(tag)
}

func (s TagService) FindLatestTagByCollection(limit, offset int) ([]models.Tag, error) {
	tagRepository := models.NewTagRepository(s.ctx)
	return tagRepository.FindLatestByCollection(limit, offset)
}

func (s TagService) FindPopularTagByCollection(limit, offset int) ([]models.Tag, error) {
	tagRepository := models.NewTagRepository(s.ctx)
	return tagRepository.FindPopularByCollection(limit, offset)
}
