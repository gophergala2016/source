package parameters

import (
	"github.com/gophergala2016/source/core/validator"
	"github.com/gophergala2016/source/internal/modules/parameters/accesstoken"
)

type (
	// RootRequest is a based request parameter.
	RootRequest struct {
		needAccessToken bool
		AccessToken     accesstoken.AccessToken
	}
)

func (p RootRequest) validate() error {
	if p.needAccessToken {
		if err := p.AccessToken.Validate(); err != nil {
			return err
		}
	}
	return nil
}

// NeedAccessToken bool need access token into header
func (p *RootRequest) NeedAccessToken() bool {
	return p.needAccessToken
}

// GetAccessToken returns an uuid of user.
func (p *RootRequest) GetAccessToken() string {
	return p.AccessToken.String()
}

// SetAccessToken sets a token of user.
func (p *RootRequest) SetAccessToken(token string) {
	p.AccessToken = accesstoken.New(token)
}

////////////////////
/// PaginationRequest
////////////////////

type (
	// PaginationRequest is
	PaginationRequest struct {
		Offset    int    `json:"offset" mapstructure:"offset" validate:"min=0"`
		Limit     int    `json:"limit" mapstructure:"limit" validate:"min=0"`
		Page      int    `json:"page" mapstructure:"page" validate:"min=0"`
		SortBy    string `json:"sort_by" mapstructure:"sort_by" validate:"regexp=^(created_at|updated_at|latest_acted_at)$"`
		SortOrder string `json:"sort_order" mapstructure:"sort_order" validate:"regexp=^(asc|desc)$"`
	}
)

var DefaultPaginationRequest PaginationRequest = PaginationRequest{
	Offset:    0,
	Limit:     10,
	Page:      0,
	SortBy:    "created_at",
	SortOrder: "desc",
}

// Validate ...
func (p PaginationRequest) Validate() error {
	return validator.Validate(p)
}
