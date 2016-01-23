package accessor

import (
	"github.com/jinzhu/gorm"

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

// GetDatabase returns a value of *xorm.Xorm by database.
func GetDatabase(ctx foundation.Context) (ret *gorm.DB) {
	if v := Value(ctx, "database"); v != nil {
		if t, ok := v.(*gorm.DB); ok {
			ret = t
		}
	}
	return
}

// SetDatabase sets a value of *xorm.Xorm.
func SetDatabase(ctx foundation.Context, v interface{}) foundation.Context {
	return WithValue(ctx, "database", v)
}

// GetMe returns a value of interface{} by me.
func GetMe(ctx foundation.Context) (ret interface{}) {
	if v := Value(ctx, "me"); v != nil {
		if t, ok := v.(interface{}); ok {
			ret = t
		}
	}
	return
}

// SetMe sets a value of interface{}.
func SetMe(ctx foundation.Context, v interface{}) foundation.Context {
	return WithValue(ctx, "me", v)
}
