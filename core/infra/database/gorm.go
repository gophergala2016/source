package database

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"

	"github.com/gophergala2016/source/core/config"
	"github.com/gophergala2016/source/core/foundation"
)

func newGorm() *gorm.DB {
	db, err := gorm.Open(config.GetDatabase().Driver, config.GetDatabase().Source)
	if err != nil {
		panic(err)
	}
	db.DB().SetMaxIdleConns(10)
	db.DB().SetMaxOpenConns(100)

	// Trace SQL
	if foundation.IsDev() {
		db.LogMode(true)
		db.Debug()
	}
	return &db
}

var gormDB *gorm.DB

// NewGorm open db
func NewGorm() *gorm.DB {
	if gormDB == nil {
		gormDB = newGorm()
	}
	return gormDB
}
