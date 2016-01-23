package services

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/models"
)

type UserFavoriteItemService struct {
	RootService
}

func NewUserFavoriteItemService(ctx foundation.Context) UserFavoriteItemService {
	return UserFavoriteItemService{
		RootService: NewRootService(ctx),
	}
}

func (s UserFavoriteItemService) CreateUserFavoriteItem(userID, itemID uint64) (*models.UserFavoriteItem, error) {
	userFavItem := models.NewUserFavoriteItem(userID, itemID)
	userFavItemRepository := models.NewUserFavoriteItemRepository(s.ctx)
	return userFavItemRepository.Create(userFavItem)
}

func (s UserFavoriteItemService) FindLatestUserFavoriteItemByUserID(userID uint64) ([]models.UserFavoriteItem, error) {
	userFavItemRepository := models.NewUserFavoriteItemRepository(s.ctx)
	return userFavItemRepository.FindLatestByUserID(userID)
}

func (s UserFavoriteItemService) FindLatestUserFavoriteItemByCollection(userID uint64, limit, offset int) ([]models.UserFavoriteItem, error) {
	userFavItemRepository := models.NewUserFavoriteItemRepository(s.ctx)
	return userFavItemRepository.FindLatestByUserIDAndCollection(userID, limit, offset)
}
