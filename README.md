# koa-session2-mongo
mongodb store for koa-session2 


## Require

node v7.x +

## Install
```
npm install koa-session2-mongo

```

## Usage
```js
const Koa = require("koa");
const session = require("koa-session2");
const MongoStore = require("koa-session2-mongo");
const app = new Koa();
app.use(session({     
    store: new MongoStore({
        url:  DB_URL  // your mongodb url  required
    })
}));

```

## Options
- `url`:   db url (required)
- `collection`: db session collection name,default  "__session"
- `maxAge`: expire time (second), default 10 \* 24 \* 3600 seconds
