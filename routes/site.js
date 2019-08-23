const Router = require("koa-router");
const router = new Router();
const mongo = require("koa-mongo");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("koa-passport");

//const User = require("../models/User");
// const User = mongoose.model("User");
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");

router
  .get("/data", async (ctx, next) => {
    ctx.body = await ctx.db
      .collection("pages")
      .find()
      .toArray();
  })
  .get("/users", async ctx => {
    ctx.response.status = 202;
    ctx.body = await ctx.db
      .collection("users")
      .find()
      .toArray();
  })
  .get("/not_found", async ctx => {
    ctx.body = [{ type: "warnning", message: "URL.Not.Found" }];
  })
  .get("/user/status", async ctx => {
    console.log("back / /user/status");
    ctx.body = [{ type: "success", message: "Auth.Login.Success" }];
  })
  .get("/user/:id", async ctx => {
    ctx.body = await ctx.db
      .collection("users")
      .findOne({ _id: mongo.ObjectId(ctx.params.id) });
  })
  .put("/user/:id", async ctx => {
    let documentQuery = { _id: mongo.ObjectId(ctx.params.id) };
    let valuesToUpdate = { $set: ctx.request.body };
    ctx.body = await ctx.db
      .collection("users")
      .updateOne(documentQuery, valuesToUpdate);
  })
  .post("/login", async (ctx, next) => {
    const { errors, isValid, data: user } = validateLoginInput(
      ctx.request.body
    );
    if (isValid) {
      return passport.authenticate("local", (err, user, info, status) => {
        console.log(user, info, status);
        if (user) {
          ctx.login(user);
          ctx.body = [{ type: "success", message: "Auth.Login.Success" }];
          ctx.response.status = 202;
        } else {
          ctx.status = 206;
          ctx.body = [{ type: "error", message: "Auth.Login.Fail" }];
        }
      })(ctx);
    } else {
      ctx.body = Object.keys(errors).reduce((set, error) => {
        return [...set, { type: "error", message: errors[error] }];
      }, []);
      ctx.response.status = 206;
    }
  })
  .post("/register", async (ctx, next) => {
    const { errors, isValid } = validateRegisterInput(ctx.request.body);
    const { username, password, passwordConfirm } = ctx.request.body;
    if (!isValid) {
      ctx.body = Object.keys(errors).reduce((set, error) => {
        return [...set, { type: "error", message: errors[error] }];
      }, []);
      ctx.response.status = 206;
    } else {
      let user = await User.findOne({
        username: username
      });
      if (user) {
        ctx.body = [
          { type: "warnning", message: "Auth.Register.Error.UserExists" }
        ];
        ctx.response.status = 206;
      } else {
        const user = new User({
          username,
          password,
          date: new Date()
        });
        await bcrypt.hash(user.password, 10).then(hash => {
          user.password = hash;
        });
        user.save();
        ctx.body = [{ type: "success", message: "Auth.Register.Succes" }];
        ctx.response.status = 200;
      }
    }
  });

module.exports = router;

// ctx.body = {
//   home: {
//     title: "Krzysztof Kamieniecki",
//     subtitle: "Webdeveloper",
//     headline: "Tworzenie i rozwój stron internetowych",
//     img: "logo.svg",
//     content: `<p> Stosuję technologie: Node.js, Express.js, Angular / React, MongoDB</p>
//         <p> Realizuję projekty [<a href="http://pl.wikipedia.org/wiki/Responsive_Web_Design"><abbr title="Responsive Web Design">RWD</abbr></a>].</p>
//         <p>Wykonuję optymalizację dla Google [<a href="http://pl.wikipedia.org/wiki/Optymalizacja_dla_wyszukiwarek_internetowych"><abbr
//               title="Search Engine Optilalization">SEO</abbr></a>].</p>
//         <p>Wykonuję graficzne elementy identyfikacji wizualnej: logo, wizytówki, papier firmowy.</p>
//         <p>Stosuję regułę <a href="http://pl.wikipedia.org/wiki/KISS_%28regu%C5%82a%29"><abbr title="Keep It Simple, Stupid">KISS</abbr></a>,
//           - elegancja, prosta i&nbsp;przejrzysta forma.</p>`
//   },
// };
