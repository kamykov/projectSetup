import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import translations from '../translations/langs';
import { Context } from './context/storeContext';
import MainWrapper from './hoc/MainWrapper/MainWrapper';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import PageSlider from './components/PageSlider/PageSlider';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Notifications from './components/Notifications/Notifications';

export default function App() {
  const { store } = useContext(Context);
  const menu = store.menu.map((item) => `/${item.link}`);
  // console.log(menu);

  return (
    <IntlProvider locale={store.lang} messages={translations[store.lang]}>
      <Router>
        <Menu />
        <MainWrapper>
          <Header />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/user/status" component={Profile} />
            <Route path="/not_found" render={() => <h1>OK</h1>} />
            <Route path={menu} component={PageSlider} />
            {/* <Route path="/" component={PageSlider} /> */}
          </Switch>
        </MainWrapper>
        <Notifications />
      </Router>
    </IntlProvider>
  );
}
