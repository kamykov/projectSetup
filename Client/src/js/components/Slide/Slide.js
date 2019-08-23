import React, { useState, useEffect } from "react";
import "./Slide.scss";

function Slide({ children, delay }) {
  const [classes, setClasses] = useState("slide");

  useEffect(() => {
    const timer = setTimeout(() => setClasses("slide slide--animated"), delay);
    return () => clearTimeout(timer);
  }, [classes]);

  return <div className={classes}>{children}</div>;
}

export default Slide;
