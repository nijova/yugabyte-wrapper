const cassandraDriver = require('yb-ycql-driver');
const postgresDriver = require('pg');

const yugabyteDrivers = {cassandraDriver, postgresDriver};

module.exports = { yugabyteDrivers }