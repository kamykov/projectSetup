import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './MainWrapper.scss';
import { SET_DOTS } from '../../actions';
import Canvas from '../Canvas/Canvas';
import Panel from '../../components/Panel/Panel';
import WingNav from '../../components/WingNav/WingNav';
import { Context } from '../../context/storeContext';

function MainWrapper({ children }) {
  const {
    store: { isMenuOpen, dots },
    dispatch,
  } = useContext(Context);

  const OnChange = ({ target: { value } }) => {
    dispatch({ type: SET_DOTS, value: parseInt(value, 10) });
  };
  const classes = isMenuOpen ? 'main main--moveout' : 'main';
  return (
    <main className={classes}>
      <Canvas dots={dots} />
      <Panel dots={dots} onChange={OnChange} />
      {children}
      <WingNav />
    </main>
  );
}

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MainWrapper;
