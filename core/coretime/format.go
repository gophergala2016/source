package coretime

import (
	"time"
)

const (
	DateTimeLayout        = "2006-01-02 15:04:05"
	DateLayout            = "2006-01-02"
	ISO8601ExtendedLayout = "2006-01-02T15:04:05-07:00"
)

// DateFormat ...
func DateFormat(t time.Time) string {
	return t.Format(DateLayout)
}

// ParseDateFormat returns
func ParseDateFormat(v string) (time.Time, error) {
	return time.Parse(DateLayout, v)
}

// MustParseDateFormat returns
func MustParseDateFormat(v string) time.Time {
	t, _ := ParseDateFormat(v)
	return t
}

// DateTimeFormat ...
func DateTimeFormat(t time.Time) string {
	return t.Format(DateTimeLayout)
}

// ParseDateTimeFormat returns
func ParseDateTimeFormat(v string) (time.Time, error) {
	return time.Parse(DateTimeLayout, v)
}

// MustParseDateTimeFormat returns
func MustParseDateTimeFormat(v string) time.Time {
	t, _ := ParseDateTimeFormat(v)
	return t
}

// ISO8601ExtendedFormat ...
func ISO8601ExtendedFormat(t time.Time) string {
	return t.Format(ISO8601ExtendedLayout)
}

// ParseISO8601ExtendedFormat returns
func ParseISO8601ExtendedFormat(v string) (time.Time, error) {
	return time.Parse(ISO8601ExtendedLayout, v)
}

// MustParseISO8601ExtendedFormat returns
func MustParseISO8601ExtendedFormat(v string) time.Time {
	t, _ := ParseISO8601ExtendedFormat(v)
	return t
}
