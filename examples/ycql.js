const YCQL = require('yugabyte').YCQL;
const async = require('async');
const assert = require('assert');

// Make sure your credentials and options allow you to access the DB.
let contactPoints = ['127.0.0.1']; 
let loadBalancing = new YCQL.cassandraDriver.policies.loadBalancing.RoundRobinPolicy();
const ycqlClient = YCQL.getCassandraClient({contactPoints, policies:{loadBalancing}});

let data = {id:1, name: 'Johnny', age: 35, location: {city: 'Tijuana', country: 'Mexiko'}};
const example = async (client, data) => {
    try {
        await async.series([
            (next) => client.connect(next),
            (next) => client.execute('CREATE KEYSPACE IF NOT EXISTS ycql_example;', next),
            (next) => {const createTable = `CREATE TABLE IF NOT EXISTS ycql_example.t1 (id int PRIMARY KEY, name varchar, age int, location jsonb);`;
                client.execute(createTable, next);
            },
            (next) => {
                const insert = `INSERT INTO ycql_example.t1 (id, name, age, location) VALUES (${data.id}, '${data.name}', ${data.age}, '${JSON.stringify(data.location)}');`;
                client.execute(insert, next);
            },
            (next) => {
                const select = `SELECT name, age, location FROM ycql_example.t1 WHERE id = ${data.id};`;
                client.execute(select, function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    assert(result.rows.length == 1);
                    let row = result.rows[0];
                    assert(row.name == data.name);
                    assert(row.age == data.age);
                    assert(row.location.city == data.location.city);
                    assert(row.location.country == data.location.country);
                    console.log('Data asserted.');
                    next();
                });
            }
        ]);
    } finally {
        await async.series([
            (next) => {
                const cleanUp = `DROP TABLE ycql_example.t1;`;
                client.execute(cleanUp, next);
            },
            (next) => client.shutdown(next)
        ]);
    }    
};

example(ycqlClient, data);
