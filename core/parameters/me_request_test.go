package parameters

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestGetMeRequest tests
func TestGetMeRequest(t *testing.T) {
	assert := assert.New(t)

	assert.Implements((*Parameter)(nil), new(GetMeRequest))
	assert.Implements((*RequestParameter)(nil), new(GetMeRequest))

	var p GetMeRequest
	p = GetMeRequest{}
	_ = p

}
