import React, { useContext } from "react";
import { appDispatch } from "../../App";
import "./Menu.scss";

export default function Menu() {
  const {
    store: { menu, isMenuOpen },
    dispatch
  } = useContext(appDispatch);

  const classes = isMenuOpen ? ["menu", "is-visible"] : ["menu"];

  const menuItems = menu.map((item, index) => {
    return (
      <li className="menu__element" key={index}>
        {item.title}
      </li>
    );
  });

  function handleClick() {
    dispatch({ type: "SWITCH_MENU" });
  }

  console.log(isMenuOpen);

  return (
    <div className={classes.join(" ")}>
      <button className="menu__button" onClick={handleClick} />
      <ul className="menu__list">{menuItems}</ul>
    </div>
  );
}
