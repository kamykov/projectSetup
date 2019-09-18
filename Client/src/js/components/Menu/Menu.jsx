/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Context } from '../../context/storeContext';
import './Menu.scss';

function Menu({ intl }) {
  const {
    store: { menu, isMenuOpen },
    dispatch,
  } = useContext(Context);

  const classes = isMenuOpen ? ['menu', 'is-visible'] : ['menu'];

  function handleClick() {
    dispatch({ type: 'SWITCH_MENU' });
  }

  const menuItems = menu.map((item) => {
    const { title, link } = item;
    const translated = intl.formatMessage({ id: title });
    const half = parseInt(translated.length / 2, 10);
    const [l, r] = [translated.slice(0, half), translated.slice(half)];

    return (
      <li className="menu__element" key={item.link}>
        <NavLink
          to={`/slider#${link}`}
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
    <div className={classes.join(' ')}>
      <button type="button" className="menu__button" onClick={handleClick} />
      <ul className="menu__list">{menuItems}</ul>
    </div>
  );
}

Menu.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Menu);
