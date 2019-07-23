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

app.use(json());
app.use(bodyParser());

app.use(site.routes());

app.listen(3000, () => console.log("Server Started ..."));
