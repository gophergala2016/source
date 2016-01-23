package internal

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gophergala2016/source/core/config"
)

// TestInit
func TestInit(t *testing.T) {
	assert := assert.New(t)

	assert.NotEqual("", config.GetApp().Name)
}
