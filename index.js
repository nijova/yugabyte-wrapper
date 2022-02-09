const drivers = (require('./src/drivers.js')).drivers;

const getPostgresClient = (connectionString) => new drivers.postgres.Client(connectionString);

const cassandraPolicies = drivers.cassandra.policies;
const getCassandraClient = (contactPoints, policies) => new drivers.cassandra.Client({ contactPoints, policies });

// const async = require('async');
// const assert = require('assert');

var conString = "postgres://postgres@localhost:5433/postgres";
var postgresClient = getPostgresClient(conString);

const loadBalancing = new cassandraPolicies.loadBalancing.RoundRobinPolicy();
const cassandraClient = getCassandraClient( ['127.0.0.1'], { loadBalancing });
