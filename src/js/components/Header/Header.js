import React, { useContext } from "react";
import { Context } from "../../App";
import LangSwitcher from "../LangSwitcher/LangSwitcher";

import "./Header.scss";

export default function Header() {
  const { dispatch } = useContext(Context);

  function switchMenu() {
    dispatch({ type: "SWITCH_MENU" });
  }

  return (
    <header className="header">
      <button className="header__button" onClick={switchMenu}>
        MENU <span className="burger" />
      </button>
      <LangSwitcher />
    </header>
  );
}
