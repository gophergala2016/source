package accesstoken

import (
	"crypto/rand"
	"io"
)

// GenerateRandomKey generate random key to generate accessToken
func GenerateRandomKey(lenght int) []byte {
	k := make([]byte, lenght)
	if _, err := io.ReadFull(rand.Reader, k); err != nil {
		return nil
	}
	return k
}
