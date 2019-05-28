const Koa = require("Koa");
const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require("@koa/cors");

const app = new Koa();
const site = require("./routes/site");

app.use(json());
app.use(cors());
app.use(bodyParser());
//app.use(async ctx => (ctx.body = { elo: "Hello world" }));

app.use(site.routes()).use(site.allowedMethods());

app.listen(3000, () => console.log("Server Started ..."));
