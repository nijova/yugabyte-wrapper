const YSQL = require('../index.js').YSQL;
const async = require('async');
const assert = require('assert');

// Make sure the connectionString and credentials allow you to reach your DB.
let connectionString = "postgres://postgres@localhost:5433/postgres";
const client = YSQL.getPostgresClient( {connectionString} );

let data = {id:1, name: 'Johnny', age: 35, city: 'New York'};
const example = async (data) => {
    try {
        await async.series([
            (next) => client.connect(next),
            (next) => {const create_table = `CREATE TABLE person (id int PRIMARY KEY, name varchar, age int, city varchar);`;
                client.query(create_table, next);
            },
            (next) => {
                const insert = `INSERT INTO person (id, name, age, city) VALUES (${data.id}, '${data.name}', ${data.age}, '${data.city}');`;
                client.query(insert, next);
            },
            (next) => {
                const select = `SELECT name, age, city FROM person WHERE id = ${data.id};`;
                client.query(select, function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    assert(result.rows.length == 1);
                    let row = result.rows[0];
                    assert(row.name == data.name);
                    assert(row.age == data.age);
                    assert(row.city == data.city);
                    console.log('Data asserted.');
                    next();
                });
            }
        ]);
    } finally {
        await async.series([
            (next) => {
                const deletion = `DROP TABLE person;`;
                client.query(deletion, next);
            },
            (next) => client.end(next)
        ]);
    }    
};

example(data);
