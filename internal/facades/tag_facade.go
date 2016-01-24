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

func (f TagFacade) CreateTag(name, color string, score uint) (*models.Tag, error) {
	tagService := services.NewTagService(f.ctx)
	return tagService.CreateTag(name, color, score)
}

func (f TagFacade) FindTagByIDs(ids []uint64) ([]models.Tag, error) {
	tagService := services.NewTagService(f.ctx)
	return tagService.FindTagByIDs(ids)
}

func (f TagFacade) FindTagByScore(userID uint64, limit int) ([]models.Tag, error) {
	userTagService := services.NewUserTagService(f.ctx)
	userTags, err := userTagService.FindLatestByUserIDAndCollection(userID, limit)
	if err != nil {
		return nil, err
	}
	tagIDs := make([]uint64, len(userTags))
	for i, userTag := range userTags {
		tagIDs[i] = userTag.TagID
	}
	tagService := services.NewTagService(f.ctx)
	return tagService.FindTagByIDs(tagIDs)
}

func (f TagFacade) ScoringTag(userID, tagID uint64) (*models.UserTag, error) {
	userTagService := services.NewUserTagService(f.ctx)
	userTag, err := userTagService.GetFirstOrCreate(userID, tagID)
	if err != nil {
		return nil, err
	}
	userTag.Score = userTag.Score + 1
	return userTagService.UpdateByID(userTag)
}
