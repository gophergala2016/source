package services

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
)

type UserTagService struct {
	RootService
}

func NewUserTagService(ctx foundation.Context) UserTagService {
	return UserTagService{
		RootService: NewRootService(ctx),
	}
}

func (s UserTagService) FindLatestByUserIDAndCollection(userID uint64, limit int) ([]models.UserTag, error) {
	userTagRepository := models.NewUserTagRepository(s.ctx)
	return userTagRepository.FindLatestByUserIDAndCollection(userID, limit, 0)
}

func (s UserTagService) GetFirstOrCreate(userID, tagID uint64) (*models.UserTag, error) {
	userTag := models.NewUserTag(userID, tagID)
	userTagRepository := models.NewUserTagRepository(s.ctx)
	return userTagRepository.GetFirstOrCreate(userTag)
}

func (s UserTagService) UpdateByID(ent *models.UserTag) (*models.UserTag, error) {
	userTagRepository := models.NewUserTagRepository(s.ctx)
	return userTagRepository.UpdateByID(ent)
}
