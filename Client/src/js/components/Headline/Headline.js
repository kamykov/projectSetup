import React, { useState, useEffect } from 'react';
import './Headline.scss';

import { setTimeout } from 'timers';

export default function Headline({ children, delay = 60 }) {
  const [classes, setClasses] = useState('letter');

  useEffect(() => {
    setTimeout(() => {
      setClasses('letter letter--animated');
    }, 150);
  }, [classes]);

  const html = Array.from(children).map((letter, index) => {
    const minWidth = letter === ' ' ? '.5em' : 'auto';
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
