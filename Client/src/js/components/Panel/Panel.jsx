import React from 'react';
import PropTypes from 'prop-types';

export default function Panel({
  max, min, dots, onChange,
}) {
  return (
    <div className="panel">
      <input
        type="range"
        name="dots"
        min={min}
        max={max}
        value={dots}
        onChange={onChange}
      />
    </div>
  );
}

Panel.propTypes = {
  max: PropTypes.number,
  min: PropTypes.number,
  dots: PropTypes.number,
  onChange: PropTypes.func,
};
Panel.defaultProps = {
  max: 30,
  min: 0,
  dots: 5,
  onChange: () => {},
};
