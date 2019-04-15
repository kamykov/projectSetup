import React from "react";
import style from "./Box.scss";

export default function Box({ text }) {
  console.log(style.Box);
  return <div className="Box">{text}</div>;
}
