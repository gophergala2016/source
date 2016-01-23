package foundation

import (
	"html/template"
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestNewline2BreakFilter runs
func TestNewline2BreakFilter(t *testing.T) {
	assert := assert.New(t)

	filter := Newline2BreakFilter()
	name, f := filter.Name, filter.Func

	assert.Equal("nl2br", name)
	assert.NotNil(f)
	fn, ok := f.(func(string) template.HTML)
	assert.True(ok)

	assert.Equal(template.HTML("foobar"), fn("foobar"))
	assert.Equal(template.HTML("foo<br>bar"), fn("foo\nbar"))
}

// TestRawFilter runs
func TestRawFilter(t *testing.T) {
	assert := assert.New(t)

	filter := RawFilter()
	name, f := filter.Name, filter.Func

	assert.Equal("raw", name)
	assert.NotNil(f)
	fn, ok := f.(func(string) template.HTML)
	assert.True(ok)

	assert.Equal(template.HTML("foobar"), fn("foobar"))
	assert.Equal(template.HTML("foo\nbar"), fn("foo\nbar"))
}
