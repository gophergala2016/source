package foundation

import (
	"github.com/k0kubun/pp"
	"log"
)

func init() {
	log.SetFlags(0)
}

// IsDebugging returns true if the framework is running in debug mode.
// Use SetMode(gin.Release) to switch to disable the debug mode.
func IsDebugging() bool {
	return IsDev()
}

func DetailPrintln(a ...interface{}) {
	v := append([]interface{}{"[SOURCE-" + modeName + "]"}, a...)
	log.Println(v...)
}

func Println(a ...interface{}) {
	v := append([]interface{}{"[SOURCE-" + modeName + "]"}, a...)
	log.Println(v...)
}

func Printf(format string, a ...interface{}) {
	log.Printf("[SOURCE-"+modeName+"] "+format, a...)
}

func DebugPrintf(format string, a ...interface{}) {
	if IsDebugging() {
		log.Printf("[SOURCE-debug] "+format, a...)
	}
}

func DebugDump(v ...interface{}) {
	if IsDebugging() {
		for _, r := range v {
			pp.Println(r)
		}
	}
}
