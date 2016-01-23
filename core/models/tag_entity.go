package models

import (
	"time"
)

type Tag struct {
	ID        uint64    `json:"id"         gorm:"column:id;primary_key" sql:"not null;type:bigint(20)"`
	Name      string    `json:"name"       gorm:"column:name"           sql:"not null;unique_index;type:varchar(190)"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at"     sql:"not null;type:datetime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at"     sql:"not null;type:datetime"`
}
