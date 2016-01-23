package parameters

type (
	// Parameter interface
	Parameter interface {
		Validate() error
	}

	// RequestParameter interface
	RequestParameter interface {
		Parameter
		GetAccessToken() string
		SetAccessToken(string)
		NeedAccessToken() bool
	}

	// ResponseParameter interface
	ResponseParameter interface {
		Parameter
	}

	// PaginationParameter interface
	PaginationParameter interface {
		Parameter
	}
)
