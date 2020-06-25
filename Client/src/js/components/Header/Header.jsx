import React, { useContext } from 'react';
import { Context } from 'context/storeContext';
import Submenu from 'components/Submenu/Submenu';
import LangSwitcher from '../LangSwitcher/LangSwitcher';
import './Header.scss';

export default function Header() {
  const { dispatch } = useContext(Context);
  const switchMenu = () => dispatch({ type: 'SWITCH_MENU' });

  return (
    <header className="header">
      <button type="button" className="header__button" onClick={switchMenu}>
        MENU
        <span className="burger" />
      </button>
      <div>
        <Submenu />
        <LangSwitcher />
      </div>
    </header>
  );
}
