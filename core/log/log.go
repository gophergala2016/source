package log

import (
	"fmt"
	"reflect"

	"github.com/Sirupsen/logrus"

	"github.com/doloopwhile/logrusltsv"
)

func init() {
	logrus.SetFormatter(&logrusltsv.Formatter{})
	logrus.SetLevel(logrus.DebugLevel)
}

type Entity struct {
	message string
	Data    interface{}
	Err     interface{}
}

func Newf(format string, args ...interface{}) *Entity {
	e := &Entity{}
	e.message = fmt.Sprintf(format, args...)
	return e
}

func New(args ...interface{}) *Entity {
	e := &Entity{}
	e.message = fmt.Sprint(args...)
	return e
}

func (e *Entity) WithData(v interface{}) *Entity {
	e.Data = v
	return e
}

func (e *Entity) WithError(v interface{}) *Entity {
	e.Err = v
	return e
}

func (e *Entity) Fields() logrus.Fields {
	f := logrus.Fields{}
	if e.Data != nil && !reflect.ValueOf(e.Data).IsNil() {
		f["data"] = e.Data
	}
	if e.Err != nil && !reflect.ValueOf(e.Err).IsNil() {
		f["error"] = e.Err
	}
	return f
}

func (e *Entity) Error() {
	logrus.WithFields(e.Fields()).Error(e.message)
}

func (e *Entity) Info() {
	logrus.WithFields(e.Fields()).Info(e.message)
}

func (e *Entity) Debug() {
	logrus.WithFields(e.Fields()).Debug(e.message)
}
