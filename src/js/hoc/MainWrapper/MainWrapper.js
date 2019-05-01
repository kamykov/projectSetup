import React, { useContext } from "react";
import Wrapper from "../Wrapper/Wrapper";
import "./MainWrapper.scss";
import { appDispatch } from "../../App";
import Canvas from "./../../hoc/Canvas/Canvas";

function MainWrapper(props) {
  const {
    store: { menu, isMenuOpen },
    dispatch
  } = useContext(appDispatch);

  const classes = isMenuOpen ? ["main main--moveout"] : ["main"];
  return (
    <main className={classes}>
      {props.children}
      <Canvas dots={30} />
    </main>
  );
}

export default MainWrapper;
