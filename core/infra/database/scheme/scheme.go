package scheme

import (
	"github.com/jinzhu/gorm"

	"github.com/gophergala2016/source/core/models"
)

// Create all tables
func createTables(db *gorm.DB) {
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.User{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.Item{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.UserFavoriteItem{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.ItemImpression{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.ItemTag{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.Tag{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.UserTag{})
}

// Migrate all tables
func autoMigrateTables(db *gorm.DB) {
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Item{})
	db.AutoMigrate(&models.UserFavoriteItem{})
	db.AutoMigrate(&models.ItemImpression{})
	db.AutoMigrate(&models.ItemTag{})
	db.AutoMigrate(&models.Tag{})
	db.AutoMigrate(&models.UserTag{})
}

// Sync db scheme
func Sync(db *gorm.DB) {
	createTables(db)
	autoMigrateTables(db)
}
