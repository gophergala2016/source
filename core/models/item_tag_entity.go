package models

import (
	"time"
)

type ItemTag struct {
	ItemID    uint64    `json:"item_id"    gorm:"column:item_id;primary_key" sql:"not null;index;type:bigint(20)"`
	TagID     uint64    `json:"tag_id"     gorm:"column:tag_id"              sql:"not null;index;type:bigint(20)"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at"          sql:"not null;type:datetime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at"          sql:"not null;type:datetime"`
}

func NewItemTag() *ItemTag {
	return &ItemTag{}
}
