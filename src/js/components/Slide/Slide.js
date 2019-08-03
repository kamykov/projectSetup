import React, { useState, useEffect } from "react";
import "./Slide.scss";

function Slide({ children, delay }) {
  const [classes, setClasses] = useState("slide");

  useEffect(() => {
    setTimeout(() => {
      setClasses("slide slide--animated");
    }, delay);
  }, [classes]);

  return <div className={classes}>{children}</div>;
}

export default Slide;
