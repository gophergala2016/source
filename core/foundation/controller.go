package foundation

type (
	Controller interface {
		SetContext(Context) Controller
	}

	RootController struct {
		Controller
		Context
	}
)

func (c *RootController) GetContext() Context {
	return c.Context
}

func (c *RootController) SetContext(ctx Context) Controller {
	c.Context = ctx
	return c
}
