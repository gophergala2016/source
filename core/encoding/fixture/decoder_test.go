package fixture

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestDecoder ...
func TestDecoder(t *testing.T) {
	// User is
	type User struct {
		ID    int    `json:"id"`
		Name  string `json:"name"`
		Email string `json:"email"`
	}

	assert := assert.New(t)

	var decoder *Decoder
	var err error

	{
		// Doesn't exist yaml file
		decoder = NewDecoderWithFilePath("notexists.yml")
		assert.Nil(decoder)
	}

	{
		decoder = NewDecoderWithFilePath("nouser.yml")
		assert.NotNil(decoder)
		var user User
		err = decoder.Decode(&user)
		if assert.NoError(err) {
			assert.Equal(0, user.ID)
			assert.Equal("", user.Name)
			assert.Equal("", user.Email)
		}
	}

	{
		// Exists yaml file
		decoder = NewDecoderWithFilePath("user.yml")
		assert.NotNil(decoder)

		var i int
		err = decoder.Decode(i)
		if assert.NoError(err) {
			assert.Equal(0, i)
		}
		err = decoder.Decode(&i)
		if assert.NoError(err) {
			assert.Equal(0, i)
		}

		var user User
		err = decoder.Decode(&user)
		if assert.NoError(err) {
			// Should be set a user
			assert.NotEqual(0, user.ID)
			assert.NotEqual("", user.Name)
			assert.NotEqual("", user.Email)
		}

		var users []User
		err = decoder.Decode(&users)
		if assert.NoError(err) {
			// Should be set 3 users
			if assert.Equal(3, len(users)) {
				for _, user := range users {
					assert.NotEqual(0, user.ID)
					assert.NotEqual("", user.Name)
					assert.NotEqual("", user.Email)
				}
			}
		}
		decoder = &Decoder{}
		decoder.buf = []byte(`should be broken buffer`)
		err = decoder.Decode(&users)
		assert.Error(err)
	}
}
