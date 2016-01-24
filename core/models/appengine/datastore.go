package appengine

import (
	"github.com/gophergala2016/source/core/foundation"
	"golang.org/x/net/context"

	"google.golang.org/appengine"
	"google.golang.org/appengine/datastore"
)

type (
	Datastore struct {
		ctx context.Context
	}
	IDatastore interface {
	}
	Key struct {
		o *datastore.Key
	}
)

func NewDatastore(ctx foundation.Context) *Datastore {
	return &Datastore{
		ctx: appengine.NewContext(ctx.Request().Ref()),
	}
}

func (d *Datastore) NewKey(kind, stringID string, intID int64, parent *Key) *Key {
	return &Key{datastore.NewKey(d.ctx, kind, stringID, intID, parent.o)}
}

func (d *Datastore) Put(key *Key, src interface{}) (*Key, error) {
	k, err := datastore.Put(d.ctx, key.o, src)
	if err != nil {
		return nil, err
	}
	return &Key{k}, nil
}

func (d *Datastore) Get(key *Key, dst interface{}) error {
	return datastore.Get(d.ctx, key.o, dst)
}
