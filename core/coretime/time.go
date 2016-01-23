package coretime

import (
	"time"
)

var (
	Fixed = MustParseISO8601ExtendedFormat("2009-11-10T23:00:00+00:00")
)

type Time time.Time

func New(t time.Time) Time {
	return Time(t)
}

func (t Time) Time() time.Time {
	return time.Time(t)
}

func (t Time) IsZero() bool {
	return t.Time().IsZero()
}

// DateFormat ...
func (t Time) DateFormat() string {
	return DateFormat(t.Time())
}

// DateTimeFormat ...
func (t Time) DateTimeFormat() string {
	return DateTimeFormat(t.Time())
}

// ISO8601ExtendedFormat returns
func (t Time) ISO8601ExtendedFormat() string {
	return ISO8601ExtendedFormat(t.Time())
}
