const { EOL } = require('os');
const { author, name, version } = require('../../../package');

const date = Date.now();

module.exports = `${author} ${date}${EOL}Project: ${name}${version}${EOL}`;
