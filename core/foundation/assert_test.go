package foundation

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestPanic runs
func TestPanic(t *testing.T) {
	assert := assert.New(t)

	assert.Panics(func() {
		Panic("foo", "bar", 1, true)
		Panicf("%s=%d", "bar", 1)
	})

	ProdModeClosure(func() {
		assert.NotPanics(func() {
			Panic("foo", "bar", 1, true)
			Panicf("%s=%d", "bar", 1)
		})
	})
}
