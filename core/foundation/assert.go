package foundation

import (
	"fmt"
	"strings"
)

func Assert(b bool, a ...interface{}) {
	if !b {
		Panic(a...)
	}
}

func Panic(a ...interface{}) {
	if !IsProd() {
		formats := make([]string, len(a)+1)
		panic(fmt.Errorf(strings.Join(formats, "%v "), a...))
	}
}

func Panicf(format string, a ...interface{}) {
	if !IsProd() {
		panic(fmt.Errorf(format, a...))
	}
}
