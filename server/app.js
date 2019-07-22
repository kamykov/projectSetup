const Koa = require("Koa");
const mongo = require("koa-mongo");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require("@koa/cors");

const app = new Koa();
const site = require("./routes/site");

app.use(cors());
app.use(
  mongo({
    host: "localhost",
    port: 27017,
    user: "admin",
    pass: "",
    db: "tsDB"
  })
);

// app.use(async (ctx, next) => {
//   ctx.db === ctx.mongo.db("tsDB");
//   const result = await ctx.db.collection("users").insert({ name: "haha" });
//   const userId = result.ops[0]._id.toString();
//   console.log(userId);
//   ctx.body = await ctx.db
//     .collection("users")
//     .find()
//     .toArray();
//   ctx.db.collection("users").remove({
//     _id: mongo.ObjectId(userId)
//   });
// });

app.use(json());
app.use(bodyParser());
//app.use(async ctx => (ctx.body = { elo: "Hello world" }));

app.use(site.routes());

app.listen(3000, () => console.log("Server Started ..."));
