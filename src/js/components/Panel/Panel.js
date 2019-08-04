import React, { useContext } from "react";
import "./Panel.scss";

export default function Panel({ max, min, dots, onChange }) {
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
        value={dots}
        onChange={onChange}
      />
      <div>Value: {dots}</div>
      <div>
        <button onClick={stopAnimation}>Stop</button>
      </div>
    </div>
  );
} 