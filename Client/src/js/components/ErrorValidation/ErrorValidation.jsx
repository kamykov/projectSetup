/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function ErrorValidation({ name, errors }) {
  return errors[name] ? (
    <span className="error-text">
      <FormattedMessage id={errors[name]} />
    </span>
  ) : null;
}

ErrorValidation.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};

export default ErrorValidation;
