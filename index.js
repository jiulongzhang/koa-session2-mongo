/**
 * Created by J<jiulong78@gmail.com> on 2017/4/17.
 */


const {Store} = require("koa-session2");
const mongod = require("mongodb");
const log = console.log;

class MongoStore extends Store {
    constructor(opts) {
        super();
        this.init(opts);
    }

    async init({url, options, collection = "__session", maxAge = 10 * 24 * 3600}) {
        try {
            this.db = await mongod.MongoClient.connect(url, options);
            this.coll = await this.db.collection(collection);
            let exist = await this.coll.indexExists(["access__idx"]);
            if (!exist) {
                this.coll.createIndex({"lastAccess": 1}, {name: "access__idx", expireAfterSeconds: maxAge});
            }
        } catch (e) {
            log(e.message);
        }
    }

    async get(sid) {
        try {
            let doc = await this.coll.findOne({sid: sid});
            return doc ? doc.session : undefined;
        } catch (e) {
            log(e.message);
        }
    }

    async set(session, {sid = this.getID(24)}) {
        try {
            await this.coll.updateOne({"sid": sid}, {
                "sid": sid,
                "session": session,
                "lastAccess": new Date()
            }, {upsert: true});
        } catch (e) {
            log(e.message);
        }
        return sid;
    }

    async destroy(sid) {
        try {
            await this.coll.deleteOne({sid: sid});
        } catch (e) {
            log(e.message);
        }
    }
}

module.exports = MongoStore;
