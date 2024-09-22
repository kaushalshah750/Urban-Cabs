import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root', //MSI\KAUSHAL
    password: 'Kaushal$#@#123',
    database: 'UrbanCabs'
}).promise()

// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'MSI', //MSI\KAUSHAL
//     password: '',
//     database: 'UrbanCabs'
// }).promise()

export default pool;