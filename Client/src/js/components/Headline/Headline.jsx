import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

  return <div className="headline">{html}</div>;
}

Headline.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};
Headline.defaultProps = {
  delay: 60,
};
