package fixture

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// TestDecoder ...
func TestFixture(t *testing.T) {
	// User is
	type User struct {
		ID    int    `json:"id"`
		Name  string `json:"name"`
		Email string `json:"email"`
	}

	assert := assert.New(t)

	var err error

	var users []User = nil

	// Doesn't exist yaml file
	err = UnmarshalWithFilePath("notexists.yml", &users)
	assert.NoError(err)
	assert.Nil(users)

	users = nil

	// Exists yaml file
	err = UnmarshalWithFilePath("user.yml", &users)
	if assert.NoError(err) {
		assert.NotNil(users)
		// Should be set 3 users
		if assert.Equal(3, len(users)) {
			for _, user := range users {
				assert.NotEqual(0, user.ID)
				assert.NotEqual("", user.Name)
				assert.NotEqual("", user.Email)
			}
		}
	}

	users = nil

	// Exists yaml file
	err = UnmarshalWithFilePath("user.yml", &users)
	if assert.NoError(err) {
		assert.NotNil(users)
		// Should be set 3 users
		if assert.Equal(3, len(users)) {
			for _, user := range users {
				assert.NotEqual(0, user.ID)
				assert.NotEqual("", user.Name)
				assert.NotEqual("", user.Email)
			}
		}
	}

	users = nil

	// Exists yaml file but not correct type passed
	err = UnmarshalWithFilePath("animal.yml", &users)
	if assert.NoError(err) {
		assert.NotNil(users)
		// Should be set 3 users
		if assert.Equal(3, len(users)) {
			for _, user := range users {
				assert.NotEqual(0, user.ID)
				// Empty string because that parameters doesn't exist in yaml file
				assert.Equal("", user.Name)
				assert.Equal("", user.Email)
			}
		}
	}

}
