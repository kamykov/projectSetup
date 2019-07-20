import React, { useReducer, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/"
});

import MainWrapper from "./hoc/MainWrapper/MainWrapper";
import Box from "./components/Box/Box.jsx";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu.jsx";
import Page from "./components/Page/Page.jsx";
import Loading from "./components/Loading/Loading.jsx";
import reducer from "./reducers/storeReducer";

if (__BASE___) {
  console.log("__BASE___", __BASE___);
}

export const Context = React.createContext({
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

  const [content, setContent] = useState(undefined);

  useEffect(() => {
    instance
      .get("/data", {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        console.log(res);
        setContent(res.data);
      })
      .catch(error => console.log(error));

    return () => {};
  }, []);

  const mainClass = store.isMenuOpen ? "main main--moveout" : "main";

  return (
    <Router>
      <Context.Provider value={{ store, dispatch }}>
        <Menu />
        <MainWrapper>
          <Header />
          {content === undefined ? (
            <Loading />
          ) : (
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
          )}
        </MainWrapper>
      </Context.Provider>
    </Router>
  );
}
