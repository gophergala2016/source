package accesstoken

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNew(t *testing.T) {
	assert := assert.New(t)

	c := map[string]bool{
		"rxl2z03oVD9Wtv8f8q3412da9Idlajs92laHJla":   false, // The length is 39.
		"po8Uw4ZwYcK071o8Y3E4tVmqwFDw0oKSLJi9rhk7":  true,  // The length is 40.
		"k1F5LMRovupNrnxMyXUStzdR6HZynUToeMBGekD1Z": false, // The length is 41.
		"po8Uw4ZwYcK071:8Y3E4tVmqwFDw0oKSLJi9rhk7":  false, // It contains symbol `:`.
	}
	for t, ok := range c {
		token := New(t)
		assert.Equal(t, token.String())
		if ok {
			assert.NoError(token.Validate())
		} else {
			assert.Error(token.Validate())
		}
	}
}

func TestGenerate(t *testing.T) {
	assert := assert.New(t)

	c := map[AccessToken]bool{}
	for i := 0; i < 1000; i++ {
		token := Generate([]byte("foobar"))
		if _, found := c[token]; found {
			assert.Fail("Duplicated Token")
		}
		c[token] = true
		assert.NoError(token.Validate())
	}
}
