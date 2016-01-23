package parameters

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gophergala2016/source/core/parameters/accesstoken"
)

// TestRootRequest tests
func TestRootRequest(t *testing.T) {
	assert := assert.New(t)

	var req RootRequest
	req = RootRequest{}
	assert.NoError(req.validate(false))
	assert.Error(req.validate(true))
	assert.Equal("", req.GetAccessToken())

	token := accesstoken.Generate([]byte("foobar"))
	req.SetAccessToken(token.String())
	assert.Equal(token.String(), req.GetAccessToken())
}

// TestPaginationRequest tests
func TestPaginationRequest(t *testing.T) {
	assert := assert.New(t)

	assert.Implements((*PaginationParameter)(nil), new(PaginationRequest))
	var paging PaginationRequest
	assert.Error(paging.Validate())
	assert.NoError(DefaultPaginationRequest.Validate())
}
