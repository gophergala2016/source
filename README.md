![](https://github.com/gophergala2016/source/blob/private/design/source_logo.png)

# source

[source](http://getsource.io) provides source code hosted on [GitHub](https://github.com).

**For All Developers**

GitHub is a very important and famous web site for developers around the world. An user creates an awesome project to publish. It's a great way to contribute to the world but sometimes the project is obscured under more that 5 million open source projects on GitHub. Finally, we released a grate matching code service which is responsible for appropriated codes for you.

The "source" service has a powerful recommendation system. You don't need to search what you want anymore from now on.

## Features

- Generate contents by GitHub's URL.
- Search projects by Programming Languages.


## Screenshots

### Beautiful Entrance Page

![](https://github.com/gophergala2016/source/blob/private/design/HOME.png)

### Detail Page

![](https://github.com/gophergala2016/source/blob/private/design/ITEM.png)

## Installation

`source` app is hosted on Google App Engine.

Perhaps, the project is runnable without Google App Engine on your local machin.

```
$ go get -u github.com/gophergala2016/source
$ cd /path/to/source
$ make gen-app
$ go run ./internal/app/*.go
```

Check the following command if you host on Google App Engine

```
$ go get -u github.com/gophergala2016/source
$ cd /path/to/source
$ make gen-app-gae
$ vim ./internal/app/app.yaml
$ goapp deploy ./internal/app
```

## Technical Specifications

### Go

- Go1.4.2+
    - Buildable and Runnable over than Go1.5.
- `internal` package
    - The feature is available from Go1.5.
    - Conceal outside packages. (partly private system)
- go generate
    - To generate app routes, app config, sql file and more.
- go routine
    - To calculate scores about powerfule recommendation system.

### WAF - Web Application Framework

- [gin-gonic/gin](https://github.com/gin-gonic/gin)
    - Handle Request and Response.
- source/core/foundation
    - Equipped Context to provide important things.

### ORM

- [jinzhu/gorm](https://github.com/jinzhu/gorm)
    - The ORM is so fantastic for go developers.

### Front-end

- AngularJS2
- TypeScript

### Google Cloud Platform

- App Engine
- Cloud SQL
- Cloud Storage
- Cloud Datastore
- Networking


