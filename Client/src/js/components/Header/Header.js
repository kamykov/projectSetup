import React, { useContext } from "react";
import { Context } from "../../App";
import LangSwitcher from "../LangSwitcher/LangSwitcher";
import Submenu from "../Submenu/Submenu.jsx.js";
import "./Header.scss";

export default function Header() {
  const { dispatch } = useContext(Context);
  const switchMenu = () => dispatch({ type: "SWITCH_MENU" });

  return (
    <header className="header">
      <button className="header__button" onClick={switchMenu}>
        MENU <span className="burger" />
      </button>
      <div>
        <Submenu />
        <LangSwitcher />
      </div>
    </header>
  );
}
