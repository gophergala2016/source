package models

type Github struct {
	Author      string   `json:"author"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Languages   []string `json:"languages"`
	Star        int      `json:"star"`
}

func NewGithub(author, name, description string, languages []string, star int) *Github {
	return &Github{
		Author:      author,
		Name:        name,
		Description: description,
		Languages:   languages,
		Star:        star,
	}
}
