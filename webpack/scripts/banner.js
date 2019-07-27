/* eslint-disable prefer-template, no-console */
const { EOL } = require("os");

const { author, name, version } = require("../../package.json");

const date = Date.now();

module.exports = `${author} ${date}${EOL}Project: ${name}${version}${EOL}`;
