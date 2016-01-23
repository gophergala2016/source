package accessor

import (
	"github.com/gophergala2016/source/core/foundation"
)

var (
	// Aliases
	Get      = Value
	SetValue = WithValue
)

func Value(ctx foundation.Context, key interface{}) interface{} {
	return ctx.Value(key)
}

func WithValue(ctx foundation.Context, key interface{}, val interface{}) foundation.Context {
	return ctx.WithValue(key, val)
}

// GetAction returns a value of string by action.
func GetAction(ctx foundation.Context) (ret string) {
	if v := Value(ctx, "action"); v != nil {
		if t, ok := v.(string); ok {
			ret = t
		}
	}
	return
}

// SetAction sets a value of string.
func SetAction(ctx foundation.Context, v interface{}) foundation.Context {
	return WithValue(ctx, "action", v)
}
