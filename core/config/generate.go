package config

//go:generate go run ../../private/cli/validator/toml/main.go data/*.tml data/**/*.tml
//go:generate go-bindata -nocompress -pkg=config -ignore=(\.sample|\.gitignore) data/...
//go:generate go run ../../private/cli/generator/config/main.go -pkg=config -path=../config -dir=data data/*.tml data/**/*.tml
//go:generate gofmt -s -w ../config
