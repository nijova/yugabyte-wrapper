const cassandra = require('yb-ycql-driver');
const postgres = require('pg');

const drivers = {cassandra, postgres};

module.exports = { drivers }