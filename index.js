const drivers = (require('./src/drivers.js')).drivers;

const postgresDriver = drivers.postgres;
const getPostgresClient = (config) => new postgresDriver.Client(config);

const cassandraDriver = drivers.cassandra;
const getCassandraClient = (options) => new cassandraDriver.Client(options);

// const async = require('async');
// const assert = require('assert');

var connectionString = "postgres://postgres@localhost:5433/postgres";
var postgresClient = getPostgresClient([connectionString]);

let loadBalancing = new cassandraDriver.policies.loadBalancing.RoundRobinPolicy();
let contactPoints = ['127.0.0.1']; 
const cassandraClient = getCassandraClient({contactPoints, loadBalancing});
