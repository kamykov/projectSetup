import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Animletter.scss';

import { setTimeout } from 'timers';

export default function Animletter({ children, index, delay }) {
  const [classes, setClasses] = useState('animletter');

  useEffect(() => {
    setTimeout(() => {
      setClasses('animletter animletter--animated');
    }, 150);
  }, [classes]);

  const html = Array.from(children).map((letter) => {
    const minWidth = letter === ' ' ? '.5em' : 'auto';
    const key = `${letter + index}`;
    return (
      <span
        key={key}
        className={classes}
        style={{ minWidth, transitionDelay: `${index * delay}ms` }}
      >
        {letter}
      </span>
    );
  });

  return html;
}

Animletter.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  index: PropTypes.number,
};
Animletter.defaultProps = {
  delay: 10,
  index: 0,
};
