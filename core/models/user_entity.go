package models

import (
	"time"
)

type User struct {
	ID          uint64    `json:"id"           gorm:"column:id;primary_key" sql:"not null;type:bigint(20)"`
	Name        string    `json:"name"         gorm:"column:name"           sql:"not null;unique_index;type:varchar(190)"`
	AvatarURL   string    `json:"avatar_url"   gorm:"column:avatar_url"     sql:"default null;type:varchar(190)"`
	Location    string    `json:"location"     gorm:"column:location"       sql:"default null;type:varchar(190)"`
	AccessToken string    `json:"access_token" gorm:"column:access_token"   sql:"not null;unique_index;type:char(40)"`
	CreatedAt   time.Time `json:"created_at"   gorm:"column:created_at"     sql:"not null;type:datetime"`
	UpdatedAt   time.Time `json:"updated_at"   gorm:"column:updated_at"     sql:"not null;type:datetime"`
	DeletedAt   time.Time `json:"deleted_at"   gorm:"column:deleted_at"     sql:"default null;type:datetime"`
}

func NewUser() *User {
	return &User{}
}
