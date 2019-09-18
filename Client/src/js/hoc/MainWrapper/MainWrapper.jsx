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

  const handlerOnChange = ({ target: { value } }) => {
    dispatch({ type: SET_DOTS, value: parseInt(value, 10) });
  };
  const classes = isMenuOpen ? ['main main--moveout'] : ['main'];
  return (
    <main className={classes}>
      {children}
      <Canvas dots={dots} />
      <Panel dots={dots} min={3} max={30} onChange={handlerOnChange} />
      <WingNav />
    </main>
  );
}

MainWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};


export default MainWrapper;
