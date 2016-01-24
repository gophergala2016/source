package responses

type (
	TagResponse struct {
		Name  string `json:"name"`
		Color string `json:"color"`
	}
)

func NewTagResponse(name, color string) TagResponse {
	return TagResponse{
		Name:  name,
		Color: color,
	}
}
