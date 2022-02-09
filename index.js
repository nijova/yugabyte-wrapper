const drivers = (require('./src/drivers.js')).drivers;

const getPostgresClient = (config) => new drivers.postgres.Client(config);

const cassandraPolicies = drivers.cassandra.policies;
const getCassandraClient = (options) => new drivers.cassandra.Client(options);

// const async = require('async');
// const assert = require('assert');

var connectionString = "postgres://postgres@localhost:5433/postgres";
var postgresClient = getPostgresClient([connectionString]);

let loadBalancing = new cassandraPolicies.loadBalancing.RoundRobinPolicy();
let contactPoints = ['127.0.0.1']; 
const cassandraClient = getCassandraClient({contactPoints, loadBalancing});
