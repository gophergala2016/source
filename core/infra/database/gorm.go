package database

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"

	"github.com/gophergala2016/source/core/config"
)

func newGorm() *gorm.DB {
	db, err := gorm.Open(config.GetDatabase().Driver, config.GetDatabase().Source)
	if err != nil {
		panic(err)
	}
	db.DB().SetMaxIdleConns(10)
	db.DB().SetMaxOpenConns(100)
	return &db
}

var gormDB *gorm.DB

// NewGorm ...
func NewGorm() *gorm.DB {
	if gormDB == nil {
		gormDB = newGorm()
	}
	return gormDB
}
