import React, { useReducer } from 'react';
import reducer from '../reducers/storeReducer';

export const initialState = {
  lang: 'en',
  isMenuOpen: false,
  notifications: {},
  dots: 12,
  menu: [
    { title: 'Menu.Home', link: 'home' },
    { title: 'Menu.About', link: 'omnie' },
    { title: 'Menu.Training', link: 'szkolenia' },
    { title: 'Menu.Contact', link: 'kontakt' },
  ],
};

export const Context = React.createContext(initialState);

export const StoreProvider = (props) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ store, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
