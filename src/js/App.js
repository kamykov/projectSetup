import React, { useReducer, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Box from "./components/Box/Box.jsx";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu.jsx";
import Page from "./components/Page/Page.jsx";
import reducer from "./reducers/switchMenuReducer";

export const appDispatch = React.createContext(null);

export default function App() {
  const [store, dispatch] = useReducer(reducer, {
    isMenuOpen: false,
    name: "Kris",
    menu: [
      { title: "Home", link: "home" },
      { title: "O mnie", link: "omnie" },
      { title: "Szkolenie", link: "szkolenie" },
      { title: "Kontakt", link: "kontakt" }
    ]
  });

  const content = {
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
    }
  };

  const mainClass = store.isMenuOpen ? "main main--moveout" : "main";

  return (
    <Router>
      <appDispatch.Provider value={{ store, dispatch }}>
        <Menu />
        <main className={mainClass}>
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
              path="/"
              render={props => <Page {...props} content={content["omnie"]} />}
            />
          </Switch>
        </main>
      </appDispatch.Provider>
    </Router>
  );
}
