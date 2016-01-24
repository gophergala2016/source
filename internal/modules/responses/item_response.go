package responses

import (
	"time"
)

type (
	ItemResponse struct {
		ID          uint64        `json:"id"`
		GithubURL   string        `json:"github_url"`
		Author      string        `json:"author"`
		Name        string        `json:"name"`
		Description string        `json:"description"`
		CreatedAt   time.Time     `json:"created_at"`
		View        uint          `json:"view"`
		Star        uint          `json:"star"`
		User        UserResponse  `json:"user"`
		Tags        []TagResponse `json:"tags"`
	}

	ItemListResponse struct {
		Items []ItemResponse
	}
)

func NewItemResponse(id uint64, githubURL, author, name, description string, createdAt time.Time) ItemResponse {
	return ItemResponse{
		ID:          id,
		GithubURL:   githubURL,
		Author:      author,
		Name:        name,
		Description: description,
		CreatedAt:   createdAt,
	}
}

func (r *ItemResponse) SetImpression(view, star uint) {
	r.View = view
	r.Star = star
}

func (r *ItemResponse) SetUser(userResponse UserResponse) {
	r.User = userResponse
}

func (r *ItemResponse) AppendTag(tagResponse TagResponse) {
	r.Tags = append(r.Tags, tagResponse)
}
