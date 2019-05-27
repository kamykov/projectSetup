import React, { useContext } from "react";
import "./Panel.scss";

import { Context } from "../../App";

export default function Panel(props) {
  const { dispatch } = useContext(Context);
  const { max, min, dots, onChange } = props;

  const handleOnchange = ({ target: { value } }) => {
    onChange(value);
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
        min={min}
        max={max}
        value={props.dots}
        onChange={handleOnchange}
      />
      <div>Value: {dots}</div>
      <div>
        <button onClick={stopAnimation}>Stop</button>
      </div>
    </div>
  );
}
