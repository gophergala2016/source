package models

import (
	"time"
)

type ArticleImpression struct {
	ArticleID uint64    `json:"article_id" gorm:"column:article_id;primary_key" sql:"not null;index;type:bigint(20)"`
	Count     uint      `json:"count"      gorm:"column:count"                  sql:"not null"`
	CreatedAt time.Time `json:"created_at" gorm:"column:created_at"             sql:"not null;type:datetime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"column:updated_at"             sql:"not null;type:datetime"`
}

func NewArticleImpression() *ArticleImpression {
	return &ArticleImpression{}
}
