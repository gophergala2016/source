package foundation

import (
	"html/template"
	"strings"
)

type (
	Filter struct {
		Name string
		Func interface{}
	}
)

func Newline2BreakFilter() Filter {
	return Filter{
		Name: "nl2br",
		Func: func(text string) template.HTML {
			body := strings.Replace(template.HTMLEscapeString(text), "\n", "<br>", -1)
			return template.HTML(body)
		},
	}
}

func RawFilter() Filter {
	return Filter{
		Name: "raw",
		Func: func(text string) template.HTML {
			return template.HTML(text)
		},
	}
}
