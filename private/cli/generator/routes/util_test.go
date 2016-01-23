package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestMain runs
func TestMain(t *testing.T) {
	assert := assert.New(t)

	testParsePackage := func(name string, expected ...string) {
		var parent, pck, substr string
		parent, pck, substr = parsePackage(name)
		if len(expected) >= 1 {
			assert.Equal(expected[0], parent, name)
		}
		if len(expected) >= 2 {
			assert.Equal(expected[1], pck, name)
		}
		if len(expected) >= 3 {
			assert.Equal(expected[2], substr, name)
		}
	}
	testParsePackage("", "", "", "")
	testParsePackage("foo", "", "foo", "")
	testParsePackage("foo.Bar", "", "foo", "Bar")
	testParsePackage("github.com/source/foo", "github.com/source", "foo", "")
	testParsePackage("github.com/source/foo.Bar", "github.com/source", "foo", "Bar")
	testParsePackage("github.com/source/foo.Bar.Get", "github.com/source", "foo.Bar", "Get")
	testParsePackage("foo.bar.baz", "", "foo.bar", "baz")
	testParsePackage("foo/bar/baz", "foo/bar", "baz", "")

	testParsePatternPath := func(path string, expected []string) {
		result := parsePatternPath(path)
		assert.Equal(expected, result)
	}
	testParsePatternPath("/foo/bar", ([]string)(nil))
	testParsePatternPath("/foo/:id", []string{"id"})
	testParsePatternPath("/foo/:id1/bar/:id2/*id3", []string{"id1", "id2", "id3"})
	testParsePatternPath("/foo/:id1/:id2/:id3/:id4/:id5", []string{"id1", "id2", "id3", "id4", "id5"})
	testParsePatternPath("/foo/:id1/:id2/:id3/:id4", []string{"id1", "id2", "id3", "id4"})
}
