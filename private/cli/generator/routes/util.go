package main

import (
	"path/filepath"
	"strings"

	"github.com/BurntSushi/toml"
	"github.com/kaneshin/genex"
)

type (
	Routes struct {
		Endpoint struct {
			Routes []Route `toml:"route"`
		}
		Packages    []Package    `toml:"package"`
		Controllers []Controller `toml:"controller"`
		Statics     []Static     `toml:"static"`
		HTML        []HTML       `toml:"html"`
	}
	Route struct {
		Method         string `toml:"method"`
		Path           string `toml:"path"`
		Controller     string `toml:"controller"`
		Parameter      string `toml:"parameter"`
		RootController string `toml:"root_controller"`
	}
	Package struct {
		Name string `toml:"name"`
	}
	Controller struct {
		Struct         string `toml:"struct"`
		RootController string `toml:"root_controller"`
	}
	Static struct {
		Path         string `toml:"path"`
		RelativePath string `toml:"relative_path"`
	}
	HTML struct {
		Pattern      string `toml:"pattern"`
		RelativePath string `toml:"relative_path"`
	}
)

func MustParseGlobs(args []string) (list []Routes, filepaths []string) {
	for _, fp := range genex.MustParseGlobs(args[:]) {
		if strings.HasSuffix(fp, ".tml") {
			var routes Routes
			if _, err := toml.DecodeFile(fp, &routes); err != nil {
				panic(err)
			}
			filepaths = append(filepaths, fp)
			list = append(list, routes)
		}
	}
	return
}

// foo
//  => "", "foo", ""
// foo.Bar
//  => "", "foo", "Bar"
// github.com/source/foo
//  => "github.com/source", "foo", ""
// github.com/source/foo.Bar
//  => "github.com/source", "foo", "Bar"
func parsePackage(name string) (parent, pck, substr string) {
	if len(name) == 0 {
		return
	}
	var split []string
	// substr
	split = strings.Split(name, "/")
	split = strings.Split(split[len(split)-1], ".")
	if len(split) > 1 {
		substr = split[len(split)-1]
		name = strings.TrimSuffix(name, "."+substr)
	}
	split = strings.Split(name, "/")

	// pck
	pck = split[len(split)-1]

	// parent
	if len(split) > 1 {
		parent = strings.TrimSuffix(name, "/"+pck)
	}

	return
}

// /foo/bar/:id1/baz/:id2/*id3 => ["id1", "id2", "id3"]
func parsePatternPath(path string) (matches []string) {
	if len(path) == 0 {
		return
	}
	splitter := func(path string) (dir, file string) {
		dir, file = filepath.Split(path)
		dir = filepath.Clean(dir)
		return
	}
	dir, file := path, ""
	for {
		dir, file = splitter(dir)
		switch {
		case strings.HasPrefix(file, ":"), strings.HasPrefix(file, "*"):
			matches = append(matches, file[1:])
		}
		if len(file) == 0 {
			break
		}
	}

	// Reverse
	c := len(matches)
	for i := 0; i < c/2; i++ {
		matches[i], matches[c-i-1] = matches[c-i-1], matches[i]
	}

	return
}
