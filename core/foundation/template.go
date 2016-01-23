package foundation

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"
)

type (
	_Template struct {
		Filters []Filter
		Delims  Delimiters
	}

	Delimiters struct {
		Left, Right string
	}
)

var (
	Template _Template = _Template{
		// Sets default html template filters
		Filters: []Filter{
			Newline2BreakFilter(),
			RawFilter(),
		},
	}
)

// ToTemplateMap transfer
func (t _Template) ToTemplateMap() map[string]interface{} {
	result := map[string]interface{}{}
	size := len(t.Filters)
	for i := 0; i < size; i++ {
		flt := t.Filters[i]
		result[flt.Name] = flt.Func
	}

	return result
}

// isValid checks
func (d Delimiters) isValid() bool {
	return len(d.Left) > 0 && len(d.Right) > 0
}

// Get returns delimiters of left and right.
func (d Delimiters) Get() (string, string) {
	return d.Left, d.Right
}

func templateName(relativePath, filename string) string {
	relativePath = filepath.Clean(relativePath)
	filename = filepath.Clean(filename)
	name := strings.Replace(filename, relativePath+"/", "", -1)
	return name
}

// parseFiles is the helper for the method and function. If the argument
// template is nil, it is created from the first file.
func parseFiles(t *template.Template, relativePath string, filenames ...string) (*template.Template, error) {
	if len(filenames) == 0 {
		// Not really a problem, but be consistent.
		return nil, fmt.Errorf("html/template: no files named in call to ParseFiles")
	}
	for _, filename := range filenames {
		b, err := ioutil.ReadFile(filename)
		if err != nil {
			return nil, err
		}
		s := string(b)

		name := templateName(relativePath, filename)
		// First template becomes return value if not already defined,
		// and we use that one for subsequent New calls to associate
		// all the templates together. Also, if this file has the same name
		// as t, this file becomes the contents of t, so
		//  t, err := New(name).Funcs(xxx).ParseFiles(name)
		// works. Otherwise we create a new template associated with t.
		var tmpl *template.Template
		if t == nil {
			t = template.New(name)
		}
		if name == t.Name() {
			tmpl = t
		} else {
			tmpl = t.New(name)
		}
		if len(Template.Filters) > 0 {
			tmpl = applyFilters(tmpl, Template.Filters...)
		}
		if Template.Delims.isValid() {
			tmpl.Delims(Template.Delims.Get())
		}
		DebugPrintf("Parse as \"%s\"\n", name)
		_, err = tmpl.Parse(s)
		if err != nil {
			return nil, err
		}
	}
	return t, nil
}

// parseGlob is the implementation of the function and method ParseGlob.
func parseGlob(t *template.Template, relativePath, pattern string) (*template.Template, error) {
	glob := func(t *template.Template, relativePath, pattern string) (*template.Template, error) {
		filenames, err := filepath.Glob(pattern)
		if err != nil {
			return nil, err
		}
		if len(filenames) == 0 {
			return nil, fmt.Errorf("html/template: pattern matches no files: %#q", pattern)
		}
		return parseFiles(t, relativePath, filenames...)
	}

	info, err := os.Stat(pattern)
	if err != nil {
		return nil, err
	}

	patterns := []string{}
	if info.IsDir() {
		walker := func(p string, f os.FileInfo, err error) error {
			if !f.IsDir() {
				patterns = append(patterns, p)
			}
			return nil
		}
		if err := filepath.Walk(pattern, walker); err != nil {
			return nil, err
		}
	} else {
		patterns = []string{pattern}
	}

	for _, pat := range patterns {
		templ, err := glob(t, relativePath, pat)
		if err != nil {
			return nil, err
		}
		t = templ
	}

	return t, nil
}

// applyFilters sets functions of template.
func applyFilters(t *template.Template, filters ...Filter) *template.Template {
	funcMap := template.FuncMap{}
	for _, filter := range filters {
		if filter.Func == nil {
			continue
		}
		funcMap[filter.Name] = filter.Func
	}
	return t.Funcs(funcMap)
}
