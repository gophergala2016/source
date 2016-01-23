package gintest

import (
	"fmt"
	"html/template"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/contrib/sessions"
	"github.com/gin-gonic/gin"
)

var (
	shared gin.Context
	router *gin.Engine = nil
)

func Init() {
	if router == nil {
		gin.SetMode(gin.TestMode)
		router = gin.Default()
		templ := template.New("index")
		router.SetHTMLTemplate(templ)
		store := sessions.NewCookieStore([]byte("foundation"))
		router.Use(sessions.Sessions("foundation", store))
		portNo := 0
		go func() {
			router.GET("/", func(c *gin.Context) {
				shared = *c
			})

			for portNo = 8124; true; portNo++ {

				addr := fmt.Sprintf(`:%d`, portNo)
				err := router.Run(addr)
				if err != nil {
					if strings.HasSuffix(err.Error(), `address already in use`) {
						continue
					}
				}

				break
			}

		}()
		time.Sleep(50 * time.Millisecond)
		http.Get(fmt.Sprintf("http://localhost:%d/", portNo)) // portNoが0じゃなくなるまでwaitしたほうが良い気もするが一旦
	}
}

// SharedContext creates Context of gin
func SharedContext() *gin.Context {
	if shared.Request != nil {
		return &shared
	}
	return &gin.Context{}
}
