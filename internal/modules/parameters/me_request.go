package parameters

type (
	GetMeRequest struct {
		RootRequest
	}
)

// Validate ...
func (p GetMeRequest) Validate() error {
	return p.RootRequest.validate(true)
}
