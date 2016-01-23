package foundation

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func init() {
	SetMode(TestMode)
}

var ProdModeClosure = func(f func()) {
	mode := Mode()
	SetMode(ProdMode)
	f()
	SetMode(mode)
}

var DevModeClosure = func(f func()) {
	mode := Mode()
	SetMode(DevMode)
	f()
	SetMode(mode)
}

func TestModeGen(t *testing.T) {
	assert := assert.New(t)

	// Default
	assert.Equal(TestMode, Mode(), "Should be test mode on default")

	SetMode(DevMode)
	assert.Equal(DevMode, Mode())
	assert.True(IsDev())
	assert.False(IsProd())

	SetMode(ProdMode)
	assert.Equal(ProdMode, Mode())
	assert.True(IsProd())

	SetMode(TestMode)
	assert.Equal(TestMode, Mode())
	assert.True(IsTest())
	assert.False(IsProd())

	assert.Panics(func() {
		SetMode("panic")
	}, "Calling SetMode passing not expected value should panic")

	assert.Equal(TestMode, Mode())
	ProdModeClosure(func() {
		assert.Equal(ProdMode, Mode())
	})
	assert.Equal(TestMode, Mode())

	assert.Equal(TestMode, Mode())
	DevModeClosure(func() {
		assert.Equal(DevMode, Mode())
	})
	assert.Equal(TestMode, Mode())
}
