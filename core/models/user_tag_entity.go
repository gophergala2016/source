package models

import (
	"time"
)

type UserTag struct {
	UserID    uint64    `json:"user_id"    gorm:"column:user_id;primary_key" sql:"not null;type:bigint(20);index:idx_ut_user_id_tag_id"`
	TagID     uint64    `json:"tag_id"     gorm:"column:item_id;primary_key"  sql:"not null;type:bigint(20);index:idx_ut_user_id_tag_id"`
	Score     uint      `json:"score"      gorm:"column:score"               sql:"not null;index"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at"          sql:"not null;type:datetime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at"          sql:"not null;type:datetime"`
}

func NewUserTag(userID, tagID uint64) *UserTag {
	return &UserTag{
		UserID: userID,
		TagID:  tagID,
		Score:  0,
	}
}

func (e UserTag) TableName() string {
	return "user_tag"
}
