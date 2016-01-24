package services

import (
	"errors"
	"strconv"
	"strings"

	"github.com/PuerkitoBio/goquery"

	"github.com/gophergala2016/source/core/models"
)

type GithubService struct {
}

func NewGithubService() GithubService {
	return GithubService{}
}

const (
	prefixSecureGithubURL = "https://github.com/"
	prefixGithubURL       = "http://github.com/"
)

// GetGithub get github info
func (s GithubService) GetGithub(githubURL string) (*models.Github, error) {
	switch {
	case strings.HasPrefix(githubURL, prefixSecureGithubURL) || strings.HasPrefix(githubURL, prefixGithubURL):
		// Correct url
	default:
		return nil, errors.New("This is not github url.")
	}

	// Get author & repo name
	author, name := func() (string, string) {
		paths := strings.Split(githubURL, "/")
		if (len(paths) - 2) < 0 {
			return "", ""
		}
		return paths[len(paths)-2], paths[len(paths)-1]
	}()

	// Hack doc
	doc, err := goquery.NewDocument(githubURL)
	if err != nil {
		return nil, err
	}

	// Get repo description
	var description string
	doc.Find(".repository-meta-content").Each(func(i int, s *goquery.Selection) {
		description = strings.TrimSpace(s.Text())
	})

	// Get repo star
	var star int
	doc.Find(".social-count.js-social-count").Each(func(i int, s *goquery.Selection) {
		star, err = strconv.Atoi(strings.TrimSpace(s.Text()))
	})
	if err != nil {
		return nil, err
	}

	// Get repo languages (for item tag)
	var langs []string
	doc.Find(".repository-lang-stats-graph.js-toggle-lang-stats").Each(func(i int, s *goquery.Selection) {
		githubLangs := strings.Split(s.Text(), "\n")
		for _, githubLang := range githubLangs {
			trimedLang := strings.TrimSpace(githubLang)
			if len(trimedLang) <= 0 {
				continue
			}
			langs = append(langs, trimedLang)
		}
	})

	return models.NewGithub(
		author,
		name,
		description,
		langs,
		star,
	), nil
}
