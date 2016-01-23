LINTIGNOREDEPS='vendor/.+\.go'

source_ONLY_PKGS=$(shell go list ./... 2> /dev/null | grep -v "/,/" | grep -v "/private/" | grep -v "/vendor/")
source_WITH_VENDOR_PKGS=$(shell go list ./... 2> /dev/null | grep -v "/,/" | grep -v "/private/" | grep -v "/vendor/src")

all: help

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  docs                    to build source documentation"
	@echo "  build                   to go build the source"
	@echo "  unit                    to run unit tests"
	@echo "  verify                  to verify tests"
	@echo "  lint                    to lint the source"
	@echo "  vet                     to vet the source"
	@echo "  generate                to go generate and make services"

docs:
	@echo "generate source docs"
	@cd ./docs/api && bundle install && bundle exec rake

build:
	@echo "go build source and vendor packages"

unit: build verify test

test:
	@echo "go test source and vendor packages"
	@go test $(source_ONLY_PKGS)

generate: gen-core gen-app

gen-core:
	go generate ./core/...

gen-app:
	go generate ./internal/app/...

gen-app-gae:
	SOURCE_GAE=1 go generate ./internal/app/...

verify: vet

lint:
	@echo "go lint packages"
	@lint=`golint ./...`; \
	lint=`echo "$$lint" | grep -E -v -e ${LINTIGNOREDEPS}`; \
	echo "$$lint"; \
	if [ "$$lint" != "" ]; then exit 1; fi

vet:
	@echo "go vet packages"
	@go tool vet -all -structtags -shadow $(shell ls -d */ | grep -v "," | grep -v "private" | grep -v "vendor")

