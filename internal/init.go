package internal

import (
	"path/filepath"

	"github.com/gophergala2016/source/core/foundation"
)

var (
	AppName      string
	basePath     string
	internalPath string
	ViewsPath    string
)

func Init(appName, port string) {
	AppName = appName
	basePath = foundation.BasePath
	internalPath = filepath.Join(basePath, "internal")
	ViewsPath = filepath.Join(internalPath, "views")

	paths := [][]string{
		{"    BasePath", foundation.BasePath},
		{"   ViewsPath", ViewsPath},
	}
	foundation.DebugPrintf("[%s] Running %s in %s mode\n", AppName, AppName, foundation.Mode())
	foundation.DebugPrintf("[%s] Listening and serving HTTP on %s\n", AppName, port)
	for _, v := range paths {
		foundation.DebugPrintf("[%s] %s = %s\n", AppName, v[0], v[1])
	}
}

func JoinPath(elem ...string) string {
	return filepath.Join(append([]string{basePath}, elem...)...)
}
