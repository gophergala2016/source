package validator

import (
	"gopkg.in/validator.v2"
)

// @deprecated

/*
	type UserRequest struct {
		Username string `validate:"min=3,max=40,regexp=^[a-zA-Z]+$"`
		Name     string `validate:"nonzero"`
		Age      int    `validate:"min=18"`
		Password string `validate:"min=8"`
	}

    Then validating a variable of type NewUserRequest becomes trivial.

	nur := UserRequest{Username: "something", ...}
	if err := validator.Validate(nur); err != nil {
		// do something
	}
*/

// Validate validates the fields of a struct based on 'validator' tags and
// returns errors found indexed by the field name.
func Validate(v interface{}) error {
	return validator.Validate(v)
}
