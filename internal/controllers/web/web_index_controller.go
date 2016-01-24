package web

type WebIndexController struct {
	WebRootController
}

func (c WebIndexController) Index() {
	// Rendering
	c.Web().SetTemplateName("index.html")
	c.Web().OK(map[string]interface{}{
		"status": "OK",
	})
}
