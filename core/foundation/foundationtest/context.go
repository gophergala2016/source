package foundationtest

import (
	"github.com/gophergala2016/source/core/foundation"
	"github.com/gophergala2016/source/core/foundation/foundationtest/gintest"
)

func init() {
	gintest.Init()
}

// NewContext creates Context
func NewContext() foundation.Context {
	return foundation.NewContext(gintest.SharedContext())
}
