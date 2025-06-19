
// const mysql = require('mysql2');
// require('dotenv').config(); // טוען את משתני הסביבה מהקובץ .env


// // const pool = mysql.createPool({
// //     host: process.env.DB_HOST,
// //     user: process.env.DB_USER,
// //     password: process.env.DB_PASSWORD,
// //     port: process.env.DB_PORT,
// //     database: process.env.DB_NAME
// // }).promise();

// const pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     charset: 'utf8mb4'
// }).promise();
// module.exports = pool

// async function create_query(query, params = null) {
//     try {
//         if (params) {
//             const [result] = await pool.execute(query, params);
//             console.log(result);
//             return result;
//         } else {
//             const [result] = await pool.execute(query);
//             console.log(result);
//             return result;
//         }
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }
// async function get_query(query, params = null) {
//     try {
//         if (params) {
//             const [rows, fields] = await pool.query(query, params);
//             console.log(`the row is:` + rows);
//             return rows;
//         }
//         const [rows, fields] = await pool.query(query);
//         console.log(`the row is:` + rows);
//         return rows;

//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

// async function createTables() {
//     try {
//         const createAnnouncementsTable = `
//             CREATE TABLE IF NOT EXISTS announcements (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                  title VARCHAR(255) NOT NULL,
//                 content TEXT NOT NULL,
//                 startDate DATE NOT NULL,
//                 endDate DATE NOT NULL,
//                 isActive BOOLEAN DEFAULT TRUE,
//                 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             );
//         `;
//         const createBasketsTable = `
//         CREATE TABLE IF NOT EXISTS baskets (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             title VARCHAR(255) NOT NULL,
//             description TEXT,
//             sum INT NOT NULL,
//             image VARCHAR(255),
//             freeAmount TINYINT(1) DEFAULT 1
//         );`;

//         const createDonorTable = `
//         CREATE TABLE IF NOT EXISTS donors (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             first_name VARCHAR(255) NOT NULL,
//             last_name VARCHAR(255) NOT NULL,
//             phone VARCHAR(15),
//             email VARCHAR(255) NOT NULL,
//             address TEXT,
//             createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//     `;
//         const creatTableAdministratorPermissions = `CREATE TABLE IF NOT EXISTS admin_permissions (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL
// );`;

//         const createDonationsTable = `
//         CREATE TABLE IF NOT EXISTS donations (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             donor_id INT NOT NULL,
//             amount DECIMAL(10,2) NOT NULL,
//             donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//             frequency ENUM('one-time', 'recurring') NOT NULL,
//             purpose VARCHAR(255),
//             notes TEXT,
//             FOREIGN KEY (donor_id) REFERENCES donors(id) ON DELETE CASCADE
//         );
//     `
//         await pool.execute(createAnnouncementsTable);
//         await pool.execute(createBasketsTable);
//         await pool.execute(createDonorTable);
//         await pool.execute(createDonationsTable);
//         await pool.execute(creatTableAdministratorPermissions);




//         console.log("✅ Table 'announcements' is ready");

//         console.log("✅ Tables 'announcements', 'baskets', 'donors' and 'donations' are ready.");
//     } catch (error) {
//         console.error("❌ Error creating tables:", error);
//     }
// }

// pool.getConnection()
//     .then(async (connection) => {
//         console.log("Connected to MySQL!");
//         connection.release();
//         await createTables(); // יצירת טבלאות אם הן לא קיימות

//     })
//     .catch(error => {
//         console.error("Failed to connect to MySQL:", error);
//     });

// module.exports = { pool, get_query, create_query };


const { Pool } = require('pg'); // יבוא את ה-Pool מ-pg
require('dotenv').config(); // טוען את משתני הסביבה מהקובץ .env
// יצירת pool חיבור
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME
// },ssl: { rejectUnauthorized: false });
const pool = new Pool({
  host: process.env.PG_HOST,
  port: 5432,
  user: 'postgres',
  password: process.env.PG_PASSWORD,
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;

// פונקציה לביצוע שאילתות
async function create_query(query, params = null) {
    try {
        const result = params ? await pool.query(query, params) : await pool.query(query);
        console.log(result.rows); // PostgreSQL מחזיר את התוצאות ב-rows
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function get_query(query, params = null) {
    try {
        const result = params ? await pool.query(query, params) : await pool.query(query);
        console.log("The row is:", result.rows);
        return result.rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createTables() {
    try {
        const createAnnouncementsTable = `
            CREATE TABLE IF NOT EXISTS announcements (
                id SERIAL PRIMARY KEY, 
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
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                sum INT NOT NULL,
                image VARCHAR(255),
                freeAmount BOOLEAN DEFAULT TRUE
            );
        `;

        const createDonorTable = `
            CREATE TABLE IF NOT EXISTS donors (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                phone VARCHAR(15),
                email VARCHAR(255) NOT NULL,
                address TEXT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;

        const creatTableAdministratorPermissions = `
            CREATE TABLE IF NOT EXISTS admin_permissions (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `;

        const createDonationsTable = `
            CREATE TABLE IF NOT EXISTS donations (
                id SERIAL PRIMARY KEY,
                donor_id INT NOT NULL,
                amount DECIMAL(10,2) NOT NULL,
                donation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                frequency VARCHAR(50) CHECK (frequency IN ('one-time', 'recurring')) NOT NULL,
                purpose VARCHAR(255),
                notes TEXT,
                FOREIGN KEY (donor_id) REFERENCES donors(id) ON DELETE CASCADE
            );
        `;

        // ביצוע יצירת טבלאות
        await pool.query(createAnnouncementsTable);
        await pool.query(createBasketsTable);
        await pool.query(createDonorTable);
        await pool.query(createDonationsTable);
        await pool.query(creatTableAdministratorPermissions);

        console.log("✅ Tables 'announcements', 'baskets', 'donors', 'donations' and 'admin_permissions' are ready.");
    } catch (error) {
        console.error("❌ Error creating tables:", error);
    }
}

// התחברות והפעלה
pool.connect()
    .then(async (client) => {
        console.log("Connected to PostgreSQL!");
        client.release();
        await createTables(); // יצירת טבלאות אם הן לא קיימות
    })
    .catch(error => {
        console.error("Failed to connect to PostgreSQL:", error);
    });

module.exports = { pool, get_query, create_query };
