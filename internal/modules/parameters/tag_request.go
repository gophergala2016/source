package parameters

type (
	GetTagListRequest struct {
		RootRequest
		Limit int `json:"limit" mapstructure:"limit"`
	}
)

func NewGetTagListRequest() GetTagListRequest {
	return GetTagListRequest{
		RootRequest: RootRequest{
			needAccessToken: false,
		},
	}
}

// Validate ...
func (p GetTagListRequest) Validate() error {
	return p.RootRequest.validate()
}
