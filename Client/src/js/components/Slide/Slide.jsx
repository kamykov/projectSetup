import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Slide.scss';

function Slide({ children, delay }) {
  const [classes, setClasses] = useState('slide');

  useEffect(() => {
    const timer = setTimeout(() => setClasses('slide slide--animated'), delay);
    return () => clearTimeout(timer);
  }, [classes]);

  return <div className={classes}>{children}</div>;
}

Slide.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

Slide.defaultProps = {
  delay: 60,
};

export default Slide;
