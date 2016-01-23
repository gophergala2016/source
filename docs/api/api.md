## <a name="resource-common"></a>Common Parameters

useful


## <a name="resource-item"></a>Item

recommended library

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **comment** | *string* | user comment | `"example"` |
| **created_at** | *date-time* | when item was created | `"2015-01-01T12:00:00Z"` |
| **description** | *string* | github description | `"example"` |
| **github_url** | *string* | github url | `"example"` |
| **id** | *integer* | identity | `42` |
| **name** | *string* | github name | `"example"` |
| **tags** | *array* | tags item has | `[{"id":42,"name":"example","color":"example","created_at":"2015-01-01T12:00:00Z","updated_at":"2015-01-01T12:00:00Z"}]` |
| **updated_at** | *date-time* | when item was updated | `"2015-01-01T12:00:00Z"` |
| **[user:avatar_url](#resource-user)** | *string* | github user avatar url | `"example"` |
| **[user:created_at](#resource-user)** | *date-time* | when me was created | `"2015-01-01T12:00:00Z"` |
| **[user:id](#resource-user)** | *integer* | identity | `42` |
| **[user:location](#resource-user)** | *string* | github user location | `"example"` |
| **[user:name](#resource-user)** | *string* | github user id | `"example"` |
| **[user:updated_at](#resource-user)** | *date-time* | when me was updated | `"2015-01-01T12:00:00Z"` |

### Item Create

Create a new item.

```
POST /item
```

#### Optional Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **access_token** | *string* | token to access api | `"example"` |
| **comment** | *string* | user comment | `"example"` |
| **description** | *string* | github description | `"example"` |
| **github_url** | *string* | github url | `"example"` |
| **name** | *string* | github name | `"example"` |


#### Curl Example

```bash
$ curl -n -X POST https://api.getsource.io/v1/item \
  -d '{
  "access_token": "example",
  "github_url": "example",
  "name": "example",
  "comment": "example",
  "description": "example"
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "id": 42,
  "github_url": "example",
  "name": "example",
  "comment": "example",
  "description": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z",
  "user": {
    "id": 42,
    "name": "example",
    "avatar_url": "example",
    "location": "example",
    "created_at": "2015-01-01T12:00:00Z",
    "updated_at": "2015-01-01T12:00:00Z"
  },
  "tags": [
    {
      "id": 42,
      "name": "example",
      "color": "example",
      "created_at": "2015-01-01T12:00:00Z",
      "updated_at": "2015-01-01T12:00:00Z"
    }
  ]
}
```

### Item Info

Info for existing item.

```
GET /item/{item_id}
```


#### Curl Example

```bash
$ curl -n https://api.getsource.io/v1/item/$ITEM_ID
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "id": 42,
  "github_url": "example",
  "name": "example",
  "comment": "example",
  "description": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z",
  "user": {
    "id": 42,
    "name": "example",
    "avatar_url": "example",
    "location": "example",
    "created_at": "2015-01-01T12:00:00Z",
    "updated_at": "2015-01-01T12:00:00Z"
  },
  "tags": [
    {
      "id": 42,
      "name": "example",
      "color": "example",
      "created_at": "2015-01-01T12:00:00Z",
      "updated_at": "2015-01-01T12:00:00Z"
    }
  ]
}
```

### Item List

List existing items.

```
GET /items
```

#### Optional Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **limit** | *integer* | Limit | `42` |
| **offset** | *integer* | Offset | `42` |


#### Curl Example

```bash
$ curl -n https://api.getsource.io/v1/items
 -G \
  -d limit=42 \
  -d offset=42
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "instances": [
    {
      "id": 42,
      "github_url": "example",
      "name": "example",
      "comment": "example",
      "description": "example",
      "created_at": "2015-01-01T12:00:00Z",
      "updated_at": "2015-01-01T12:00:00Z",
      "user": {
        "id": 42,
        "name": "example",
        "avatar_url": "example",
        "location": "example",
        "created_at": "2015-01-01T12:00:00Z",
        "updated_at": "2015-01-01T12:00:00Z"
      },
      "tags": [
        {
          "id": 42,
          "name": "example",
          "color": "example",
          "created_at": "2015-01-01T12:00:00Z",
          "updated_at": "2015-01-01T12:00:00Z"
        }
      ]
    }
  ]
}
```

### Item Favorite

Favorite one item.

```
POST /item/{item_id}/favorite
```

#### Optional Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **access_token** | *string* | token to access api | `"example"` |


#### Curl Example

```bash
$ curl -n -X POST https://api.getsource.io/v1/item/$ITEM_ID/favorite \
  -d '{
  "access_token": "example"
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "id": 42,
  "github_url": "example",
  "name": "example",
  "comment": "example",
  "description": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z",
  "user": {
    "id": 42,
    "name": "example",
    "avatar_url": "example",
    "location": "example",
    "created_at": "2015-01-01T12:00:00Z",
    "updated_at": "2015-01-01T12:00:00Z"
  },
  "tags": [
    {
      "id": 42,
      "name": "example",
      "color": "example",
      "created_at": "2015-01-01T12:00:00Z",
      "updated_at": "2015-01-01T12:00:00Z"
    }
  ]
}
```

### Item Favorite List

Favorite List existing items.

```
GET /item/favorites
```

#### Optional Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **access_token** | *string* | token to access api | `"example"` |
| **limit** | *integer* | Limit | `42` |
| **offset** | *integer* | Offset | `42` |


#### Curl Example

```bash
$ curl -n https://api.getsource.io/v1/item/favorites
 -G \
  -d access_token=example \
  -d limit=42 \
  -d offset=42
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "instances": [
    {
      "id": 42,
      "github_url": "example",
      "name": "example",
      "comment": "example",
      "description": "example",
      "created_at": "2015-01-01T12:00:00Z",
      "updated_at": "2015-01-01T12:00:00Z",
      "user": {
        "id": 42,
        "name": "example",
        "avatar_url": "example",
        "location": "example",
        "created_at": "2015-01-01T12:00:00Z",
        "updated_at": "2015-01-01T12:00:00Z"
      },
      "tags": [
        {
          "id": 42,
          "name": "example",
          "color": "example",
          "created_at": "2015-01-01T12:00:00Z",
          "updated_at": "2015-01-01T12:00:00Z"
        }
      ]
    }
  ]
}
```


## <a name="resource-me"></a>Me

login user

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **access_token** | *string* | token to access api | `"example"` |
| **avatar_url** | *string* | github user avatar url | `"example"` |
| **created_at** | *date-time* | when me was created | `"2015-01-01T12:00:00Z"` |
| **id** | *integer* | identity | `42` |
| **location** | *string* | github user location | `"example"` |
| **name** | *string* | github user id | `"example"` |
| **updated_at** | *date-time* | when me was updated | `"2015-01-01T12:00:00Z"` |

### Me Create

Create a new me.

```
POST /me
```

#### Optional Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **avatar_url** | *string* | github user avatar url | `"example"` |
| **location** | *string* | github user location | `"example"` |
| **name** | *string* | github user id | `"example"` |


#### Curl Example

```bash
$ curl -n -X POST https://api.getsource.io/v1/me \
  -d '{
  "name": "example",
  "avatar_url": "example",
  "location": "example"
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "id": 42,
  "name": "example",
  "avatar_url": "example",
  "location": "example",
  "access_token": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z"
}
```

### Me Info

Info for existing me.

```
GET /me
```

#### Optional Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **access_token** | *string* | token to access api | `"example"` |


#### Curl Example

```bash
$ curl -n https://api.getsource.io/v1/me
 -G \
  -d access_token=example
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "id": 42,
  "name": "example",
  "avatar_url": "example",
  "location": "example",
  "access_token": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z"
}
```

### Me Update

Update an existing me.

```
PATCH /me
```

#### Optional Parameters

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **access_token** | *string* | token to access api | `"example"` |
| **avatar_url** | *string* | github user avatar url | `"example"` |
| **location** | *string* | github user location | `"example"` |
| **name** | *string* | github user id | `"example"` |


#### Curl Example

```bash
$ curl -n -X PATCH https://api.getsource.io/v1/me \
  -d '{
  "access_token": "example",
  "name": "example",
  "avatar_url": "example",
  "location": "example"
}' \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "id": 42,
  "name": "example",
  "avatar_url": "example",
  "location": "example",
  "access_token": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z"
}
```


## <a name="resource-tag"></a>Tag

programming language tag

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **color** | *string* | language color | `"example"` |
| **created_at** | *date-time* | when tag was created | `"2015-01-01T12:00:00Z"` |
| **id** | *integer* | identity | `42` |
| **name** | *string* | language name | `"example"` |
| **updated_at** | *date-time* | when tag was updated | `"2015-01-01T12:00:00Z"` |

### Tag Create

Create a new tag.

```
POST /tag
```


#### Curl Example

```bash
$ curl -n -X POST https://api.getsource.io/v1/tag \
  -H "Content-Type: application/json"
```


#### Response Example

```
HTTP/1.1 201 Created
```

```json
{
  "id": 42,
  "name": "example",
  "color": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z"
}
```

### Tag Info

Info for existing tag.

```
GET /article/{tag_name}
```


#### Curl Example

```bash
$ curl -n https://api.getsource.io/v1/article/$TAG_NAME
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "id": 42,
  "name": "example",
  "color": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z"
}
```

### Tag List

List existing tags.

```
GET /tags
```


#### Curl Example

```bash
$ curl -n https://api.getsource.io/v1/tags
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "instances": [
    {
      "id": 42,
      "name": "example",
      "color": "example",
      "created_at": "2015-01-01T12:00:00Z",
      "updated_at": "2015-01-01T12:00:00Z"
    }
  ]
}
```


## <a name="resource-user"></a>User

User

### Attributes

| Name | Type | Description | Example |
| ------- | ------- | ------- | ------- |
| **avatar_url** | *string* | github user avatar url | `"example"` |
| **created_at** | *date-time* | when me was created | `"2015-01-01T12:00:00Z"` |
| **id** | *integer* | identity | `42` |
| **location** | *string* | github user location | `"example"` |
| **name** | *string* | github user id | `"example"` |
| **updated_at** | *date-time* | when me was updated | `"2015-01-01T12:00:00Z"` |

### User Info

Info for existing user.

```
GET /user/{user_id}
```


#### Curl Example

```bash
$ curl -n https://api.getsource.io/v1/user/$USER_ID
```


#### Response Example

```
HTTP/1.1 200 OK
```

```json
{
  "id": 42,
  "name": "example",
  "avatar_url": "example",
  "location": "example",
  "created_at": "2015-01-01T12:00:00Z",
  "updated_at": "2015-01-01T12:00:00Z"
}
```


