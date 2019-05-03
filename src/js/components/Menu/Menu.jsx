import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../App";
import "./Menu.scss";

export default function Menu() {
  const {
    store: { menu, isMenuOpen },
    dispatch
  } = useContext(Context);

  const classes = isMenuOpen ? ["menu", "is-visible"] : ["menu"];

  function handleClick() {
    dispatch({ type: "SWITCH_MENU" });
  }

  const menuItems = menu.map((item, index) => {
    let { title, link } = item;
    let half = parseInt(title.length / 2);
    let l = title.slice(0, half);
    let r = title.slice(half);

    return (
      <li className="menu__element" key={index}>
        <NavLink
          to={`/${link}`}
          exact
          className="menu__link link--surinami"
          activeClassName="menu__link--selected"
          onClick={handleClick}
        >
          <span data-letters-l={l} data-letters-r={r}>
            {title}
          </span>
        </NavLink>
      </li>
    );
  });

  function handleClick() {
    dispatch({ type: "SWITCH_MENU" });
  }

  return (
    <div className={classes.join(" ")}>
      <button className="menu__button" onClick={handleClick} />
      <ul className="menu__list">{menuItems}</ul>
    </div>
  );
}
