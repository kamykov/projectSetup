import React, { useState, useEffect } from "react";
import "./Slide.scss";

function Slide(props) {
  const { children, delay, type } = props;

  const [classes, setClasses] = useState("slide");

  useEffect(() => {
    setTimeout(() => {
      setClasses("slide slide--animated");
    }, delay);
  }, [classes]);

  return <div className={classes}>{children}</div>;
}

export default Slide;
