import React, { useReducer, useContext } from "react";
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
      { title: "Szkolenie", link: "szkolenia" },
      { title: "Kontakt", link: "kontakt" }
    ]
  });

  return (
    <appDispatch.Provider value={{ store, dispatch }}>
      <Header />
      <Menu />
      <Page />
    </appDispatch.Provider>
  );
}
