import React, { useContext } from "react";
import Wrapper from "../Wrapper/Wrapper";
import "./MainWrapper.scss";
import { SET_DOTS } from "../../actions/";
import { Context } from "../../App";
import Canvas from "./../../hoc/Canvas/Canvas";
import Panel from "../../components/Panel/Panel";

function MainWrapper(props) {
  const {
    store: { menu, isMenuOpen, dots },

    dispatch
  } = useContext(Context);

  const handlerOnChange = value => {
    dispatch({ type: SET_DOTS, value });
  };
  const classes = isMenuOpen ? ["main main--moveout"] : ["main"];
  return (
    <main className={classes}>
      {props.children}
      <Canvas dots={dots} />
      <Panel dots={dots} min="3" max="30" onChange={handlerOnChange} />
    </main>
  );
}

export default MainWrapper;
