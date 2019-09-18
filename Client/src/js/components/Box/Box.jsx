import React from 'react';
import PropTypes from 'prop-types';

export default function Box({ text }) {
  return <div className="box">{text}</div>;
}

Box.propTypes = {
  text: PropTypes.string,
};
Box.defaultProps = {
  text: '***some text***',
};
