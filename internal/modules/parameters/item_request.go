package parameters

type (
	GetItemRequest struct {
		RootRequest
	}
	GetItemListRequest struct {
		RootRequest
		Limit int `json:"limit" mapstructure:"limit"`
	}
	GetItemFavoriteListRequest struct {
		RootRequest
		Limit int `json:"limit" mapstructure:"limit"`
	}
	CreateItemFavoriteRequest struct {
		RootRequest
	}
	CreateItemRequest struct {
		RootRequest
		GithubURL string `json:"github_url" mapstructure:"github_url"`
	}
)

func NewGetItemRequest() GetItemRequest {
	return GetItemRequest{
		RootRequest: RootRequest{
			needAccessToken: false,
		},
	}
}

// Validate ...
func (p GetItemRequest) Validate() error {
	return p.RootRequest.validate()
}

func NewGetItemListRequest() GetItemListRequest {
	return GetItemListRequest{
		RootRequest: RootRequest{
			needAccessToken: false,
		},
	}
}

// Validate ...
func (p GetItemListRequest) Validate() error {
	return p.RootRequest.validate()
}

func NewGetItemFavoriteListRequest() GetItemFavoriteListRequest {
	return GetItemFavoriteListRequest{
		RootRequest: RootRequest{
			needAccessToken: true,
		},
	}
}

// Validate ...
func (p GetItemFavoriteListRequest) Validate() error {
	return p.RootRequest.validate()
}

func NewCreateItemFavoriteRequest() CreateItemFavoriteRequest {
	return CreateItemFavoriteRequest{
		RootRequest: RootRequest{
			needAccessToken: true,
		},
	}
}

// Validate ...
func (p CreateItemFavoriteRequest) Validate() error {
	return p.RootRequest.validate()
}

func NewCreateItemRequest() CreateItemRequest {
	return CreateItemRequest{
		RootRequest: RootRequest{
			needAccessToken: true,
		},
	}
}

// Validate ...
func (p CreateItemRequest) Validate() error {
	return p.RootRequest.validate()
}
