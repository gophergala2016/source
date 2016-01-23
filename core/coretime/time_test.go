package coretime

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestTime runs
func TestTime(t *testing.T) {
	assert := assert.New(t)

	tm := Time{}
	assert.True(tm.IsZero())

	fixed := Fixed
	assert.Equal("2009-11-10 23:00:00", DateTimeFormat(fixed))

	now := Time(fixed)
	assert.False(now.IsZero())
	assert.Equal("2009-11-10", now.DateFormat())
	assert.Equal("2009-11-10 23:00:00", now.DateTimeFormat())
	assert.Equal("2009-11-10T23:00:00+00:00", now.ISO8601ExtendedFormat())
}
