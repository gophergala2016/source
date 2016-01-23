package fixture

import (
	"encoding/json"
	"io/ioutil"
	"reflect"

	"gopkg.in/yaml.v2"
)

// Decoder is
type Decoder struct {
	buf []byte
}

// NewDecoderWithFilePath ...
func NewDecoderWithFilePath(filePath string) *Decoder {
	decoder := &Decoder{}
	buf, err := ioutil.ReadFile(filePath)
	if err != nil {
		return nil
	}
	decoder.buf = buf
	return decoder
}

// Decode ...
func (d *Decoder) Decode(v interface{}) error {
	var fixtures map[string]map[string]interface{}
	if err := yaml.Unmarshal(d.buf, &fixtures); err != nil {
		return err
	}

	var slices []map[string]interface{}
	for _, fixture := range fixtures {
		slices = append(slices, fixture)
	}

	if reflect.TypeOf(v).Kind() == reflect.Ptr {

		if len(fixtures) == 0 {
			v = nil
			return nil
		}

		var src interface{}
		elm := reflect.ValueOf(v).Elem()
		switch elm.Kind() {
		case reflect.Struct:
			src = slices[0]
		case reflect.Slice:
			src = slices
		case reflect.Interface:
			src = slices
		default:
			return nil
		}
		if src != nil {
			b, err := json.Marshal(src)
			if err != nil {
				return err
			}
			return json.Unmarshal(b, v)
		}
	}

	return nil
}
