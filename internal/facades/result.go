package facades

import ()

type Result interface {
	StatusCode() int
}

type RootResult struct {
	statusCode int
}

func (r RootResult) StatusCode() int {
	return r.statusCode
}

type ResultUser struct {
	RootResult
}
