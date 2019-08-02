import React, { useReducer, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IntlProvider, FormattedMessage } from "react-intl";
import axios from "axios";
import translations from "../translations/langs.js";
const instance = axios.create({
  baseURL: "http://localhost:3000/"
});

import MainWrapper from "./hoc/MainWrapper/MainWrapper";
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu.jsx";
import Page from "./components/Page/Page.jsx";
import PageSlider from "./components/PageSlider/PageSlider.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Login from "./components/Login/Login.jsx";
import Loading from "./components/Loading/Loading.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";
import reducer from "./reducers/storeReducer";

if (__BASE___) {
  console.log("__BASE___", __BASE___);
}

const initialState = {
  lang: "en",
  isMenuOpen: false,
  notifications: {},
  dots: 12,
  menu: [
    { title: "Menu.Home", link: "home" },
    { title: "Menu.About", link: "omnie" },
    { title: "Menu.Training", link: "szkolenia" },
    { title: "Menu.Contact", link: "kontakt" }
    // { title: "Auth.Login", link: "login" }
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
        setContent(res.data);
      })
      .catch(error => console.log(error));

    return () => {};
  }, []);

  return (
    <Context.Provider value={{ store, dispatch }}>
      <IntlProvider locale={store.lang} messages={translations[store.lang]}>
        <Router>
          <Menu />
          <MainWrapper>
            <Header />
            {content === undefined ? (
              <Loading />
            ) : (
              <Switch>
                <Route
                  exact
                  path="/szkolenia"
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
                <Route
                  path="/kontakt"
                  render={props => (
                    <Page {...props} content={content[1]["kontakt"]} />
                  )}
                />
                <Route
                  path="/slider"
                  render={props => <PageSlider {...props} content={content} />}
                />
                <Route path="/login" render={props => <Login />} />
                <Route path="/user/status" render={props => <Profile />} />
                <Route path="not_found" render={<h1>"OK"</h1>} />
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
        </Router>
      </IntlProvider>
    </Context.Provider>
  );
}
