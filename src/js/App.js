import React, { useReducer, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/"
});

import MainWrapper from "./hoc/MainWrapper/MainWrapper";
import Box from "./components/Box/Box.jsx";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu.jsx";
import Page from "./components/Page/Page.jsx";
import Login from "./components/Login/Login.jsx";
import Loading from "./components/Loading/Loading.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";
import reducer from "./reducers/storeReducer";

if (__BASE___) {
  console.log("__BASE___", __BASE___);
}

const initialState = {
  isMenuOpen: false,
  notifications: {},
  dots: 12,
  menu: [
    { title: "Home", link: "home" },
    { title: "O mnie", link: "omnie" },
    { title: "Szkolenie", link: "szkolenie" },
    { title: "Kontakt", link: "kontakt" },
    { title: "Login", link: "login" }
  ]
};

export const Context = React.createContext(initialState);

export default function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  const [content, setContent] = useState(undefined);

  useEffect(() => {
    instance
      .get("/data")
      .then(res => {
        console.log("data", res);
        setContent(res.data);
      })
      .catch(error => console.log(error));

    return () => {};
  }, []);

  const mainClass = store.isMenuOpen ? "main main--moveout" : "main";

  return (
    <IntlProvider locale="en">
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
                    <Page {...props} content={content[3]["szkolenia"]} />
                  )}
                />
                <Route
                  path="/omnie"
                  render={props => (
                    <Page {...props} content={content[2]["omnie"]} />
                  )}
                />
                <Route path="/login" render={props => <Login />} />
                <Route
                  path="/"
                  render={props => (
                    <Page {...props} content={content[0]["home"]} />
                  )}
                />
              </Switch>
            )}
          </MainWrapper>
          <Notifications />
        </Context.Provider>
      </Router>
    </IntlProvider>
  );
}
