package parameters

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/gophergala2016/source/internal/modules/parameters/accesstoken"
)

// TestRootRequest tests
func TestRootRequest(t *testing.T) {
	assert := assert.New(t)

	var req RootRequest
	req = RootRequest{}
	req.needAccessToken = false
	assert.NoError(req.validate())
	req.needAccessToken = true
	assert.Error(req.validate())
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
