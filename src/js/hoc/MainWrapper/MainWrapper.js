import React, { useContext } from "react";
import Wrapper from "../Wrapper/Wrapper";
import "./MainWrapper.scss";
import { Context } from "../../App";
import Canvas from "./../../hoc/Canvas/Canvas";
import Panel from "../../components/Panel/Panel";

function MainWrapper(props) {
  const {
    store: { menu, isMenuOpen, dots },

    dispatch
  } = useContext(Context);

  console.log(dots);

  const classes = isMenuOpen ? ["main main--moveout"] : ["main"];
  return (
    <main className={classes}>
      {props.children}
      <Canvas dots={dots} />
      <Panel />
    </main>
  );
}

export default MainWrapper;
