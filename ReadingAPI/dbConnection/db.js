const { Pool } = require('pg');

const pool = new Pool({
    user: "root",
    password: "qwe123",
    database: "sampledb",
    host: "10.131.0.40",
    port: 5432
});

module.exports = pool;