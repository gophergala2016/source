package parameters

type (
	GetMeRequest struct {
		RootRequest
	}

	LoginMeRequest struct {
		RootRequest
		Name      string `json:"name" mapstructure:"name"`
		AvatarURL string `json:"avatar_url" mapstructure:"avatar_url"`
		Location  string `json:"location" mapstructure:"location"`
	}
)

func NewGetMeRequest() GetMeRequest {
	return GetMeRequest{
		RootRequest: RootRequest{
			needAccessToken: true,
		},
	}
}

// Validate ...
func (p GetMeRequest) Validate() error {
	return p.RootRequest.validate()
}

func NewLoginMeRequest() LoginMeRequest {
	return LoginMeRequest{
		RootRequest: RootRequest{
			needAccessToken: false,
		},
	}
}

// Validate ...
func (p LoginMeRequest) Validate() error {
	return p.RootRequest.validate()
}
