package foundation

import (
	"html/template"
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestDelimiters runs
func TestDelimiters(t *testing.T) {
	assert := assert.New(t)

	d := Delimiters{}
	assert.False(d.isValid())

	d.Left, d.Right = "[%", "%]"
	assert.True(d.isValid())
	l, r := d.Get()
	assert.Equal("[%", l)
	assert.Equal("%]", r)
}

// TestTemplate runs
func TestTemplate(t *testing.T) {
	assert := assert.New(t)

	type candidate struct {
		relativePath string
		filename     string
		expected     string
	}
	candidates := []candidate{
		{
			"/gophergala2016/source/docs/api",
			"/gophergala2016/source/docs/api/schemata/app.json",
			"schemata/app.json",
		},
		{
			"/gophergala2016/source/docs/",
			"/gophergala2016/source/docs/api/schemata/app.json",
			"api/schemata/app.json",
		},
		{
			"/gophergala2016/source/docs/api/",
			"/gophergala2016/source/docs/api/schemata/app.json",
			"schemata/app.json",
		},
	}
	for _, c := range candidates {
		name := templateName(c.relativePath, c.filename)
		assert.Equal(name, c.expected)
	}
}

// TestApplyFilters runs
func TestApplyFilters(t *testing.T) {
	assert := assert.New(t)

	var filters []Filter
	assert.Panics(func() {
		applyFilters(nil, filters...)
	})

	templ := template.New("")
	filters = []Filter{
		{"nil", nil},
		{"str", func() string { return "" }},
	}
	assert.NotPanics(func() {
		applyFilters(templ, filters...)
	})
}
