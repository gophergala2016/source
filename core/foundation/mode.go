package foundation

import (
	"os"

	"github.com/gin-gonic/gin"
)

const ENV_SOURCE_MODE = "SOURCE_MODE"

const (
	DevMode  string = "dev"
	ProdMode string = "prod"
	TestMode string = "test"
)

var modeName string = DevMode

func Mode() string {
	return modeName
}

func init() {
	mode := os.Getenv(ENV_SOURCE_MODE)
	if len(mode) == 0 {
		SetMode(DevMode)
	} else {
		SetMode(mode)
	}
}

func SetMode(value string) {
	switch value {
	case DevMode:
		gin.SetMode(gin.DebugMode)
	case ProdMode:
		gin.SetMode(gin.ReleaseMode)
	case TestMode:
		gin.SetMode(gin.TestMode)
	default:
		panic("mode unknown: " + value)
	}
	modeName = value
}

func IsDev() bool {
	return Mode() == DevMode
}

func IsProd() bool {
	return Mode() == ProdMode
}

func IsTest() bool {
	return Mode() == TestMode
}
