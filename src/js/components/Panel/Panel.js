import React from "react";
import { FormattedMessage } from "react-intl";
import "./Panel.scss";

export default function Panel({ max, min, dots, onChange }) {
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
      <div>
        <FormattedMessage id="Panel.Dots" defaultMessage="Dots" />: {dots}
      </div>
    </div>
  );
}
