package models

import (
	"time"
)

type UserFavoriteItem struct {
	UserID    uint64    `json:"user_id"    gorm:"column:user_id;primary_key" sql:"not null;index;type:bigint(20);index:idx_fav_user_id_item_id"`
	ItemID    uint64    `json:"item_id"    gorm:"column:item_id;primary_key" sql:"not null;index;type:bigint(20);index:idx_fav_user_id_item_id"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at"          sql:"not null;type:datetime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at"          sql:"not null;type:datetime"`
}

func NewUserFavoriteItem() *UserFavoriteItem {
	return &UserFavoriteItem{}
}
