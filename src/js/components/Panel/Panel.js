import React, { useContext } from "react";
import "./Panel.scss";
import { SET_DOTS } from "../../actions/";

import { Context } from "../../App";

export default function Panel() {
  const {
    store: { dots },
    dispatch
  } = useContext(Context);

  const handleOnchange = ({ target: { value } }) => {
    dispatch({ type: SET_DOTS, value });
  };

  return (
    <div className="panel">
      <input
        type="range"
        name="dots"
        min="0"
        max="30"
        value={dots}
        onChange={handleOnchange}
      />
      <div>Value: {dots}</div>
    </div>
  );
}
