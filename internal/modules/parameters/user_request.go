package parameters

type (
	GetUserRequest struct {
		RootRequest
	}
)

func NewGetUserRequest() GetUserRequest {
	return GetUserRequest{
		RootRequest: RootRequest{
			needAccessToken: false,
		},
	}
}

// Validate ...
func (p GetUserRequest) Validate() error {
	return p.RootRequest.validate()
}
