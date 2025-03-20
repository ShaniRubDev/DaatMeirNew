
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
            console.log(`the row is:` + rows);
            return rows;
        }
        const [rows, fields] = await pool.query(query);
        console.log(`the row is:` + rows);
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

async function createTables() {
    try {
        const createAnnouncementsTable = `
            CREATE TABLE IF NOT EXISTS announcements (
                id INT AUTO_INCREMENT PRIMARY KEY,
                 title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                startDate DATE NOT NULL,
                endDate DATE NOT NULL,
                isActive BOOLEAN DEFAULT TRUE,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        const createBasketsTable = `
        CREATE TABLE IF NOT EXISTS baskets (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            sum INT NOT NULL,
            image VARCHAR(255),
            freeAmount TINYINT(1) DEFAULT 1
        );`;


        await pool.execute(createAnnouncementsTable);
        await pool.execute(createBasketsTable);

        console.log("✅ Table 'announcements' is ready");
    } catch (error) {
        console.error("❌ Error creating tables:", error);
    }
}
// pool.getConnection()
//     .then(connection => {
//         console.log("Connected to MySQL!");
//         connection.release(); // שחרר את החיבור
//     })
//     .catch(error => {
//         console.error("Failed to connect to MySQL:", error);
//     });
pool.getConnection()
    .then(async (connection) => {
        console.log("Connected to MySQL!");
        connection.release();
        await createTables(); // יצירת טבלאות אם הן לא קיימות
    })
    .catch(error => {
        console.error("Failed to connect to MySQL:", error);
    });

module.exports = { get_query, create_query }