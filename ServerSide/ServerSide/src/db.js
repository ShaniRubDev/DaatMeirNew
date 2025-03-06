
const mysql = require('mysql2');
require('dotenv').config(); // טוען את משתני הסביבה מהקובץ .env


// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME
// }).promise();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'mysql24',
    port: '3306',
    database: 'daatmeir'
}).promise();
module.exports = pool

async function create_query(query, params = null) {
    try {
        if (params) {
            const [result] = await pool.execute(query, params);
            console.log(result);
            return result;
        } else {
            const [result] = await pool.execute(query);
            console.log(result);
            return result;
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
async function get_query(query, params = null) {
    try {
        if (params) {
            const [rows, fields] = await pool.query(query, params);
            console.log(`the row is:`+rows);
            return rows;
        }
        const [rows, fields] = await pool.query(query);
        console.log(`the row is:`+rows);
        return rows;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function exampleUse() {
    try {
        const query_to_user_id = `select user_id from users where email = ? `
        const params = ['Nn05@gmail.com'];
        const result = await get_query(query_to_user_id, params);
    }
    catch (error) {
        console.log(`the error is: ${error}`) 
    }
}

module.exports = { get_query, create_query }