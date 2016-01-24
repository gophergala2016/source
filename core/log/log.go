package log

import (
	"fmt"
	"log"
)

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

func (e *Entity) Error() {
	log.Println(e.message)
}

func (e *Entity) Info() {
	log.Println(e.message)
}

func (e *Entity) Debug() {
	log.Println(e.message)
}
