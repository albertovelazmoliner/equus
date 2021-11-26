const { Client } = require('pg');

async function readDataFromDB() {
    let result = [];
    try {
        const client = new Client({
            user: 'dbuser',
            host: 'database.server.com',
            database: 'mydb',
            password: 'secretpassword',
            port: 3211,
        });
        await client.connect();
        const res = await client.query('SELECT first_name, email, date_of_birth FROM users');
        await client.end();
        result = res.rows;
    } catch (err) {
        console.log(err);
    }
    return result;
}

async function readSMSDataFromDB() {
    let result = [];
    try {
        const client = new Client({
            user: 'dbuser',
            host: 'database.server.com',
            database: 'mydb',
            password: 'secretpassword',
            port: 3211,
        });
        await client.connect();
        const res = await client.query('SELECT first_name, phone, date_of_birth FROM users');
        await client.end();
        result = res.rows;
    } catch (err) {
        console.log(err);
    }
    return result;
}

module.exports.readDataFromDB = readDataFromDB;
module.exports.readSMSDataFromDB = readSMSDataFromDB;