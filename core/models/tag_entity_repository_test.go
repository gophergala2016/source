package models

import (
	"testing"

	"github.com/gophergala2016/source/core/foundation/foundationtest"
	"github.com/stretchr/testify/assert"
)

// TestTagEntityRepository ...
func TestTagEntityRepository(t *testing.T) {
	assert := assert.New(t)

	ctx := foundationtest.NewContext()
	repo := NewTagRepository(ctx)

	ent := NewTag("foo", "#000000", 0)
	k := repo.NewKey("Tag", "", 0, nil)
	key, err := repo.Put(k, &ent)
	assert.NoError(err)
	_ = key
}
