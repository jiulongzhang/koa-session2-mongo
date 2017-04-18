# koa-session2-mongo
mongodb store for koa-session2 


## Require
node v7.x +

## Install
npm install koa-session2-mongo

## Usage
```js
const Koa = require("koa");
const session = require("koa-session2");
const MongoStore = require("koa-session2-mongo");
const app = new Koa();
app.use(session({
     key: "SESSIONID",   //default "koa:sess"
    store: new MongoStore({
        url:  DB_URL
    })
}));

```

## Options
- `url`:   db url (required)
- `collection`: db session collection name
- `maxAge`: expire time (second)
