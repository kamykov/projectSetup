/* eslint-disable import/prefer-default-export */
const production = process.env.NODE_ENV === 'production';
const host = production ? '167.71.61.5' : 'localhost:3000';

export {
  host,
};
