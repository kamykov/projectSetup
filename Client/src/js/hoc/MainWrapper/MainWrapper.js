import React, { useContext } from "react";
import "./MainWrapper.scss";
import { SET_DOTS } from "../../actions";
import { Context } from "../../App";
import Canvas from "../Canvas/Canvas";
import Panel from "../../components/Panel/Panel";
import WingNav from "../../components/WingNav/WingNav.jsx";

function MainWrapper({ children }) {
  const {
    store: { isMenuOpen, dots },
    dispatch
  } = useContext(Context);

  const handlerOnChange = ({ target: { value } }) => {
    dispatch({ type: SET_DOTS, value });
  };
  const classes = isMenuOpen ? ["main main--moveout"] : ["main"];
  return (
    <main className={classes}>
      {children}
      <Canvas dots={dots} />
      <Panel dots={dots} min="3" max="30" onChange={handlerOnChange} />
      <WingNav />
    </main>
  );
}

export default MainWrapper;
