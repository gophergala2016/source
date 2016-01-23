package parameters

type (
	GetUserRequest struct {
		RootRequest
	}
)

func NewGetUserRequest() GetUserRequest {
	return GetUserRequest{}
}

// Validate ...
func (p GetUserRequest) Validate() error {
	return p.RootRequest.validate(false)
}
