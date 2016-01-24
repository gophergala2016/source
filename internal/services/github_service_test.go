package services

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetGithub(t *testing.T) {
	assert := assert.New(t)

	const url = "https://github.com/gotokatsuya/fresco"
	gtihubService := NewGithubService()
	github, err := gtihubService.GetGithub(url)
	assert.NoError(err)

	assert.Equal("gotokatsuya", github.Author)

	assert.Equal("fresco", github.Name)

	assert.Equal(1, github.Star)

	langs := []string{"Java", "C++", "Python", "C", "Makefile", "IDL"}
	assert.Equal(langs, github.Languages)
}
