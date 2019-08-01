const Router = require("koa-router");
const router = new Router();
const mongo = require("koa-mongo");
const mongoose = require("mongoose");

require("../models/User");
const User = mongoose.model("User");
const validateLoginInput = require("../validation/login");

router
  .get("/data", async (ctx, next) => {
    ctx.body = await ctx.db
      .collection("pages")
      .find()
      .toArray();
  })
  .get("/users", async ctx => {
    ctx.body = await ctx.db
      .collection("users")
      .find()
      .toArray();
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
    const { errors, isValid } = validateLoginInput(ctx.request.body);
    if (isValid) {
      ctx.body = [{ type: "warnning", message: "Auth.Login.Success" }];
      ctx.response.status = 200;
    } else {
      console.log(errors);
      ctx.body = Object.keys(errors).reduce((set, error) => {
        return [...set, { type: "error", message: errors[error] }];
      }, []);
      ctx.response.status = 201;
    }
  })
  .post("/register", async (ctx, next) => {
    //ctx.respond = false;
    //const { errors, isValid } = validateLoginInput(ctx.request.body);
    const { username, password, passwordConfirm } = ctx.request.body;
    console.log(username, password, passwordConfirm);
    // if (!isValid) {
    //   ctx.body = Object.keys(errors).reduce((set, error) => {
    //     return [...set, { type: "error", message: errors[error] }];
    //   }, []);
    //   ctx.body.push({
    //     type: "error",
    //     message: "Auth.Register.Passwords.Error"
    //   });
    //   ctx.response.status = 200;
    // } else {

    //ctx.redirect("/login");

    let user = await User.findOne({
      username: username
    });

    if (user) {
      ctx.body = [{ type: "error", message: "Auth.Register.Error.UserExists" }];
      ctx.response.status = 200;
    } else {
      const user = new User({
        username,
        password,
        date: new Date()
      });
      await user.save();
      ctx.body = [{ type: "success", message: "Auth.Register.Succes" }];
      ctx.response.status = 200;
      next();
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
//   omnie: {
//     title: "O mnie",
//     img: "kk.jpg",
//     content: `<p>Pewnej nocy, w drodze do domu, spotkłem na swej drodze Milesa Davisa, który zwrócił się do mnie tymi słowami -
//     <q>Krzychu! Rób tak, ...żeby było dobrze !!!</q>
//     <cite>Miles Davis</cite> - w moim śnie.</p><p>W życiu zawodowym i prywatnym kieruję się tym przesłaniem, mam nadzieję, że z coraz lepszą skutecznością.</p>`
//   },
//   szkolenia: {
//     title: "Szkolenia",
//     img: "kk.jpg",
//     content: ` <p>Szkolę z zakresu tworzenia stron www:</p>
//     <h2>WEBDESIGN</h2>
//     <h2>HTML</h2>
//     <h2>CSS</h2>
//     <h2>JAVASCRIPT</h2>
//     <h2>BACKEND / CMS</h2>
//     <p>Indywidualnie i grupowo. Do tej pory zrealizowałem ponad 600 godzin szkoleń.</p>`
//   },
//   kontakt: {
//     title: "kontakt",
//     img: "kk.jpg",
//     content: `<p>Dzwoń:</p>
//     <h2>500 286 440</h2>
//     <p>Pisz:</p>
//     <h2 class="email">krzysztof@thinkstudio.pl</h2>`
//   }
// };
