package accesstoken

import (
	/// "encoding/base64"

	"code.google.com/p/go-uuid/uuid"

	"github.com/gophergala2016/source/core/encoding/base58"
	"github.com/gophergala2016/source/core/validator"
)

// AccessToken is
type AccessToken string

// New returns AccessToken by token.
func New(token string) AccessToken {
	return (AccessToken)(token)
}

// Generate generates AccessToken.
func Generate(seed []byte) AccessToken {
	id := uuid.NewUUID()
	for i := 0; i < 1000; i++ {
		sha := uuid.NewSHA1(id, seed)
		md5 := uuid.NewMD5(id, seed)
		seed = append(sha, md5...)
	}
	encoded := base58.Encode(seed)
	return New(encoded[:40])
}

// String returns a string representing the token.
func (t AccessToken) String() string {
	return string(t)
}

// Validate validates the token.
func (t AccessToken) Validate() error {
	type T struct {
		AccessToken string `validate:"min=40,max=40,regexp=^[a-zA-Z0-9]+$"`
	}
	v := T{t.String()}
	return validator.Validate(v)
}
