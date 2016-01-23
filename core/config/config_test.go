package config

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gophergala2016/source/core/foundation"
)

// TestConfigInit
func TestConfigInit(t *testing.T) {
	assert := assert.New(t)

	foundation.SetMode(foundation.TestMode)
	assert.NotPanics(func() {
		Load()
	})
	assert.Equal(foundation.TestMode, config.Mode)
	assert.Equal(foundation.TestMode, Get().Mode)

	foundation.SetMode(foundation.DevMode)
	assert.NotPanics(func() {
		Load()
	})
	assert.Equal(foundation.DevMode, config.Mode)
}
