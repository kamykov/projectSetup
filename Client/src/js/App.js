import React, {
  useContext, useState, useEffect,
} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import axios from 'axios';
import translations from '../translations/langs';

import { Context } from './context/storeContext';
import MainWrapper from './hoc/MainWrapper/MainWrapper';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import PageSlider from './components/PageSlider/PageSlider';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Loading from './components/Loading/Loading';
import Notifications from './components/Notifications/Notifications';

import { storageAvailable } from './utils/helpers';
import { SET_LANG, SET_DOTS } from './actions';

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
});


export default function App() {
  const [content, setContent] = useState(undefined);
  const { store, dispatch } = useContext(Context);

  useEffect(() => {
    if (storageAvailable('localStorage')) {
      const lang = localStorage.getItem('lang');
      const dots = localStorage.getItem('dots');
      if (lang) dispatch({ type: SET_LANG, lang });
      if (dots) dispatch({ type: SET_DOTS, value: dots });
    }
    return () => { };
  }, []);

  useEffect(() => {
    instance
      .get('/data')
      .then((res) => {
        setContent(res.data);
      })
      .catch((error) => console.log(error));

    return () => { };
  }, []);

  return (

    <IntlProvider locale="pl" messages={translations.pl}>
      <Router>
        <Menu />
        <MainWrapper>
          <Header />
          {content === undefined ? (
            <Loading />
          ) : (
            <Switch>
                <Route
                  path="/slider"
                  render={(props) => <PageSlider {...props} content={content} />}
                />
                <Route path="/login" render={() => <Login />} />
                <Route path="/user/status" render={() => <Profile />} />
                <Route path="not_found" render={() => <h1>OK</h1>} />
                <Route
                  path="/"
                  render={(props) => <PageSlider {...props} content={content} />}
                />
              </Switch>
          )}
        </MainWrapper>
        <Notifications />
      </Router>
    </IntlProvider>
  );
}
