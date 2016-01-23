package foundation

import (
	"testing"

	"github.com/gophergala2016/source/core/foundation/foundationtest/gintest"
	"github.com/stretchr/testify/assert"
)

func init() {
	gintest.Init()
}

func TestRootController(t *testing.T) {
	assert := assert.New(t)

	c := RootController{}
	assert.Nil(c.GetContext())

	var ctx Context = NewContext(gintest.SharedContext())
	assert.Equal(&c, c.SetContext(ctx))
	assert.NotNil(c.GetContext())
	assert.Equal(ctx, c.GetContext())
}
