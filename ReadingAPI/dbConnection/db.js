const Pool = require('pg').Pool;

const pool = new Pool({
    user: "root",
    password: "qwe123",
    database: "sampledb",
    host: "localhost",
    port: 12345
});

module.exports = pool;