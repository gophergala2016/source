package models

import (
	"time"
)

type Item struct {
	ID          uint64    `json:"id"          gorm:"column:id;primary_key" sql:"not null;type:bigint(20)"`
	UserID      uint64    `json:"user_id"     gorm:"column:user_id"        sql:"not null;index;type:bigint(20)"`
	GithubURL   string    `json:"github_url"  gorm:"column:github_url"     sql:"default null;unique_index;type:varchar(190)"`
	Name        string    `json:"name"        gorm:"column:name"           sql:"default null;type:varchar(190)"`
	Description string    `json:"description" gorm:"column:description"    sql:"default null;type:varchar(500)"`
	CreatedAt   time.Time `json:"created_at"  gorm:"column:created_at"     sql:"not null;type:datetime"`
	UpdatedAt   time.Time `json:"updated_at"  gorm:"column:updated_at"     sql:"not null;type:datetime"`
	DeletedAt   time.Time `json:"deleted_at"  gorm:"column:deleted_at"     sql:"default null;type:datetime"`
}

func NewItem() *Item {
	return &Item{}
}
