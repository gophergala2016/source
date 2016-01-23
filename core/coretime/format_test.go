package coretime

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

// TestFormat runs
func TestFormat(t *testing.T) {
	assert := assert.New(t)

	now := Fixed
	assert.Equal("2009-11-10", DateFormat(now))
	assert.Equal("2009-11-10 23:00:00", DateTimeFormat(now))
	assert.Equal("2009-11-10T23:00:00+00:00", ISO8601ExtendedFormat(now))

	var (
		format string
		tm     time.Time
		mtm    time.Time
		err    error
	)

	format = "2009-11-10"
	tm, err = ParseDateFormat(format)
	assert.NoError(err)
	assert.Equal(format, DateFormat(tm))
	mtm = MustParseDateFormat(format)
	assert.Equal(tm, mtm)

	format = "2009-11-10 23:12:34"
	tm, err = ParseDateTimeFormat(format)
	assert.NoError(err)
	assert.Equal(format, DateTimeFormat(tm))
	mtm = MustParseDateTimeFormat(format)
	assert.Equal(tm, mtm)

	format = "2009-11-10T23:12:34+00:00"
	tm, err = ParseISO8601ExtendedFormat(format)
	assert.NoError(err)
	assert.Equal(format, ISO8601ExtendedFormat(tm))
	mtm = MustParseISO8601ExtendedFormat(format)
	assert.Equal(tm, mtm)
}
