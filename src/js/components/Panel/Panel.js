import React, { useContext } from "react";
import "./Panel.scss";
import { SET_DOTS } from "../../actions/";

import { Context } from "../../App";

export default function Panel(props) {
  const { dispatch } = useContext(Context);

  const handleOnchange = ({ target: { value } }) => {
    dispatch({ type: SET_DOTS, value });
  };
  const stopAnimation = e => {
    e.preventDefault();
    console.log("stop");
    //cancelAnimationFrame(rAF.current);
  };

  return (
    <div className="panel">
      <input
        type="range"
        name="dots"
        min="0"
        max="30"
        value={props.dots}
        onChange={handleOnchange}
      />
      <div>Value: {props.dots}</div>
      <div>
        <button onClick={stopAnimation}>Stop</button>
      </div>
    </div>
  );
}
