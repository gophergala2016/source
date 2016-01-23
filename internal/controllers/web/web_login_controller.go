package web

import ()

type WebLoginController struct {
	WebRootController
}

func (c WebLoginController) Login() {
	// Session
	session := c.GetContext().Session()
	var count int = 0
	if v := session.Get("count"); v != nil {
		count = v.(int)
		count += 1
	}
	session.Set("count", count)
	session.Save()

	// Rendering
	c.Web().SetTemplateName("index.html")
	c.Web().OK(map[string]interface{}{
		"status":  "posted",
		"message": "Hello world",
		"session": session,
		"val":     count,
	})
}
