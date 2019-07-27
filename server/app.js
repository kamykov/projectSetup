const Koa = require("Koa");
const mongo = require("koa-mongo");
const mongoose = require("mongoose");

const bodyParser = require("koa-bodyparser");
const json = require("koa-json");
const cors = require("@koa/cors");

const app = new Koa();
const site = require("./routes/site");

mongoose.connect("mongodb://localhost/tsDB");

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

app
  .use(json())
  .use(bodyParser())
  .use(site.routes());

app.listen(3000, () => console.log("Server Started ..."));
