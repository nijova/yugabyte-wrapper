const cassandraDriver = require('./src/drivers.js').cassandra;
const postgresDriver = require('./src/drivers.js').postgres;

const getPostgresClient = (config) => new postgresDriver.Client(config);
const getCassandraClient = (options) => new cassandraDriver.Client(options);

module.exports = { YSQL: {postgresDriver, getPostgresClient}, YCQL: {cassandraDriver, getCassandraClient} };