const { Pool } = require('pg');

const pool = new Pool({
    user: "root",
    password: "qwe123",
    database: "sampledb",
    host: "localhost",
    port: 12345
});

// host: "10.128.2.114"
// port: 5432
module.exports = pool;