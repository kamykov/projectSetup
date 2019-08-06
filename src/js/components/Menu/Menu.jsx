import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Context } from "../../App";
import { injectIntl } from "react-intl";
import "./Menu.scss";

export function Menu(props) {
  const {
    store: { menu, isMenuOpen },
    dispatch
  } = useContext(Context);

  const classes = isMenuOpen ? ["menu", "is-visible"] : ["menu"];
  const { intl } = props;
  function handleClick() {
    dispatch({ type: "SWITCH_MENU" });
  }

  const menuItems = menu.map((item, index) => {
    let { title, link } = item;
    let translated = intl.formatMessage({ id: title });
    let half = parseInt(translated.length / 2);
    let [l, r] = [translated.slice(0, half), translated.slice(half)];

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
            {translated}
          </span>
        </NavLink>
      </li>
    );
  });

  return (
    <div className={classes.join(" ")}>
      <button className="menu__button" onClick={handleClick} />
      <ul className="menu__list">{menuItems}</ul>
    </div>
  );
}

export default injectIntl(Menu);
