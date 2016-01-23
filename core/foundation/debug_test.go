package foundation

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestDebug runs
func TestDebug(t *testing.T) {
	assert := assert.New(t)

	assert.False(IsDebugging())
	DebugPrintf("")
	DevModeClosure(func() {
		assert.True(IsDebugging())
		DebugPrintf("")
	})
}
