import React, { useContext } from "react";
import { appDispatch } from "../../App";

import "./Header.scss";

export default function Header(props) {
  const { dispatch } = useContext(appDispatch);

  function handleClick() {
    dispatch({ type: "SWITCH_MENU", text: "hello" });
  }

  return (
    <header className="header">
      <button className="header__button" onClick={handleClick}>
        MENU <span className="burger" />
      </button>
    </header>
  );
}
