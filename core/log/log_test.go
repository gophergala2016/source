package log

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestEntity(t *testing.T) {
	assert := assert.New(t)
	_ = assert

	data := map[string]interface{}{
		"String": "Hello world",
		"Int":    1,
		"Float":  3.14,
		"Bool":   true,
	}

	log1 := New("The log.New 1").
		WithData(data)
	log1.Info()
	log1.Debug()

	log2 := New("The log.New 2").
		WithData((*string)(nil))
	log2.Error()

	log3 := Newf("The %s", "log.Newf").
		WithData(data).
		WithError(fmt.Errorf("Error"))
	log3.Info()
	log3.Debug()
	log3.Error()
}
