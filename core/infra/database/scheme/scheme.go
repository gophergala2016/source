package scheme

import (
	"github.com/jinzhu/gorm"

	"github.com/gophergala2016/source/core/models"
)

func createTables(db *gorm.DB) {
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.User{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.Article{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.UserFavoriteArticle{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.ArticleImpression{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.ArticleTag{})
	db.Set("gorm:table_options", "ENGINE=InnoDB CHARSET=utf8mb4").CreateTable(&models.Tag{})
}

func autoMigrateTables(db *gorm.DB) {
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.Article{})
	db.AutoMigrate(&models.UserFavoriteArticle{})
	db.AutoMigrate(&models.ArticleImpression{})
	db.AutoMigrate(&models.ArticleTag{})
	db.AutoMigrate(&models.Tag{})
}

// Sync db scheme
func Sync(db *gorm.DB) {
	createTables(db)
	autoMigrateTables(db)
}
