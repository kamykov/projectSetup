import React, { useReducer, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MainWrapper from "./hoc/MainWrapper/MainWrapper";
import Box from "./components/Box/Box.jsx";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu.jsx";
import Page from "./components/Page/Page.jsx";
import reducer from "./reducers/storeReducer";

export const Context = React.createContext(null);

export default function App() {
  const [store, dispatch] = useReducer(reducer, {
    isMenuOpen: false,
    name: "Kris",
    dots: 12,
    menu: [
      { title: "Home", link: "home" },
      { title: "O mnie", link: "omnie" },
      { title: "Szkolenie", link: "szkolenie" },
      { title: "Kontakt", link: "kontakt" }
    ]
  });

  const content = {
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
          <p>Stosuję regułę <a href="http://pl.wikipedia.org/wiki/KISS_%28regu%C5%82a%29"><abbr title="Keep It Simple, Stiupid">KISS</abbr></a>,
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

  const mainClass = store.isMenuOpen ? "main main--moveout" : "main";

  return (
    <Router>
      <Context.Provider value={{ store, dispatch }}>
        <Menu />
        <MainWrapper>
          <Header />
          <Switch>
            <Route
              exact
              path="/szkolenie"
              render={props => (
                <Page {...props} content={content["szkolenia"]} />
              )}
            />
            <Route
              path="/omnie"
              render={props => <Page {...props} content={content["omnie"]} />}
            />
            <Route
              path="/"
              render={props => <Page {...props} content={content["home"]} />}
            />
          </Switch>
        </MainWrapper>
      </Context.Provider>
    </Router>
  );
}
