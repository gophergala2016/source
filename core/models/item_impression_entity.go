package models

import (
	"time"
)

type ItemImpression struct {
	ItemID    uint64    `json:"item_id"    gorm:"column:item_id;primary_key" sql:"not null;index;type:bigint(20)"`
	Count     uint      `json:"count"      gorm:"column:count"               sql:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at"          sql:"not null;type:datetime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at"          sql:"not null;type:datetime"`
}

func NewItemImpression(itemID uint64) *ItemImpression {
	return &ItemImpression{
		ItemID: itemID,
		Count:  0,
	}
}

func (e ItemImpression) TableName() string {
	return "item_impression"
}
