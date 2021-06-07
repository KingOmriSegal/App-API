const { Pool } = require('pg')
const pool = new Pool({
  user: 'root',
  host: '10.128.2.114',
  database: 'sampledb',
  password: 'qwe123',
  port: 5432,
}) 
module.exports = pool