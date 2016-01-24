package responses

type (
	UserResponse struct {
		Name      string `json:"name"`
		AvatarURL string `json:"avatar_url"`
	}
)

func NewUserResponse(name, avatarURL string) UserResponse {
	return UserResponse{
		Name:      name,
		AvatarURL: avatarURL,
	}
}
