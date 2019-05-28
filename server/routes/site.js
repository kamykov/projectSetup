const Router = require("koa-router");
const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "naked Man /";
});
router.get("/data", (ctx, next) => {
  ctx.body = {
    home: {
      title: "Krzysztof Kamieniecki",
      subtitle: "Webdeveloper",
      headline: "Tworzenie i rozwój stron internetowych",
      img: "logo.svg",
      content: `<p> Stosuję technologie: Node.js, Express.js, Angular / React, MongoDB</p>
          <p> Realizuję projekty [<a href="http://pl.wikipedia.org/wiki/Responsive_Web_Design"><abbr title="Responsive Web Design">RWD</abbr></a>].</p>
          <p>Wykonuję optymalizację dla Google [<a href="http://pl.wikipedia.org/wiki/Optymalizacja_dla_wyszukiwarek_internetowych"><abbr
                title="Search Engine Optilalization">SEO</abbr></a>].</p>
          <p>Wykonuję graficzne elementy identyfikacji wizualnej: logo, wizytówki, papier firmowy.</p>
          <p>Stosuję regułę <a href="http://pl.wikipedia.org/wiki/KISS_%28regu%C5%82a%29"><abbr title="Keep It Simple, Stupid">KISS</abbr></a>,
            - elegancja, prosta i&nbsp;przejrzysta forma.</p>`
    },
    omnie: {
      title: "O mnie",
      img: "kk.jpg",
      content: `<p>Pewnej nocy, w drodze do domu, spotkłem na swej drodze Milesa Davisa, który zwrócił się do mnie tymi słowami -
      <q>Krzychu! Rób tak, ...żeby było dobrze !!!</q>
      <cite>Miles Davis</cite> - w moim śnie.</p><p>W życiu zawodowym i prywatnym kieruję się tym przesłaniem, mam nadzieję, że z coraz lepszą skutecznością.</p>`
    },
    szkolenia: {
      title: "Szkolenia",
      img: "kk.jpg",
      content: ` <p>Szkolę z zakresu tworzenia stron www:</p>
      <h2>WEBDESIGN</h2>
      <h2>HTML</h2>
      <h2>CSS</h2>
      <h2>JAVASCRIPT</h2>
      <h2>BACKEND / CMS</h2>
      <p>Indywidualnie i grupowo. Do tej pory zrealizowałem ponad 600 godzin szkoleń.</p>`
    },
    kontakt: {
      title: "kontakt",
      img: "kk.jpg",
      content: `<p>Dzwoń:</p>
      <h2>500 286 440</h2>
      <p>Pisz:</p>
      <h2 class="email">krzysztof@thinkstudio.pl</h2>`
    }
  };
});

module.exports = router;
