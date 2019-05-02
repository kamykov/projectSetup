import React, { useState, useEffect, useRef } from "react";
import "./Headline.scss";

import useDebounce from "../../utils/useDebounce";
import { setTimeout } from "timers";

export default function Headline(props) {
  const { children, delay = 60 } = props;

  const [classes, setClasses] = useState("letter");

  //const debouncedAddClass = useDebounce(classes, 1000);

  useEffect(() => {
    setTimeout(() => {
      setClasses("letter letter--animated");
    }, 1000);
  }, [classes]);

  const html = Array.from(children).map((letter, index) => {
    let minWidth = letter === " " ? ".5em" : "auto";
    return (
      <span
        key={letter + index}
        className={classes}
        style={{ minWidth, transitionDelay: `${index * delay}ms` }}
      >
        {letter}
      </span>
    );
  });

  return <div className="headline">{html}</div>;
}
