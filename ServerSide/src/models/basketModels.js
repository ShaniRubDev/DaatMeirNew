// const { get_query, create_query } = require('../db')
// const bcrypt = require("bcrypt");

// async function getAllBaskets() {
//     try {
//         const query = 'SELECT * FROM baskets'; // התאימי את שם הטבלה
//         const baskets = await get_query(query);
//         console.log(`in model`+baskets)
//         return baskets; // מחזיר את התוצאות
//     } catch (error) {
//         console.error('Error fetching baskets:', error);
//         throw error;
//     }
// }

// async function uploadImageToDB(title, description, sum, imagePath,freeAmount) {
//     try {
//         if (!imagePath) {
//             throw new Error("Image path is missing!");
//         }
//         // כותב שאילתת INSERT למסד הנתונים כדי לשמור את פרטי הסל עם התמונה
//         const query = 'INSERT INTO baskets (title,description, sum, image,  freeAmount) VALUES ( ?, ?, ?,?,?)';
//         const params = [title, description, sum, imagePath,freeAmount];
        
//         // מבצע את השאילתה
//       const result =  await create_query(query, params);
//       return { id: result.insertId, title, description, sum, freeAmount, image: imagePath };
//     } catch (error) {
//         console.error('Error saving image to the database:', error);
//         throw error; // זורק שגיאה אם משהו לא עובד
//     }
// }
// // שמירת סל גם בלי תמונה
// async function saveBasket(title, description, sum, freeAmount, image = null) {
//     try {
//         const query = 'INSERT INTO baskets (title, description, sum, freeAmount, image) VALUES (?, ?, ?, ?, ?)';
//         const params = [title, description, sum, freeAmount, image];

//         const result = await create_query(query, params);
//         return { id: result.insertId, title, description, sum, freeAmount, image };
//     } catch (error) {
//         console.error('Error saving basket to the database:', error);
//         throw error;
//     }
// }
// async function deleteBasketFromDB(id) {
//     try {
//         const query = 'DELETE FROM baskets WHERE id = ?';
//         const params = [id];
//         const result = await create_query(query, params);
//         return result;  // מחזיר את התוצאה של המחיקה (אם הצליחה או לא)
//     } catch (error) {
//         console.error('Error deleting basket:', error);
//         throw error;
//     }
// }

// module.exports = { getAllBaskets,uploadImageToDB,saveBasket,deleteBasketFromDB};


const { get_query, create_query } = require('../db');

async function getAllBaskets() {
    try {
        const query = 'SELECT * FROM baskets'; 
        const baskets = await get_query(query);
        console.log(`in model`, baskets);
        return baskets;
    } catch (error) {
        console.error('Error fetching baskets:', error);
        throw error;
    }
}

async function uploadImageToDB(title, description, sum, imagePath, freeAmount) {
    try {
        if (!imagePath) {
            throw new Error("Image path is missing!");
        }

        const query = `
            INSERT INTO baskets (title, description, sum, image, freeAmount)
            VALUES ($1, $2, $3, $4, $5) RETURNING id
        `;
        const params = [title, description, sum, imagePath, freeAmount];

        const result = await create_query(query, params);
        return { id: result[0].id, title, description, sum, freeAmount, image: imagePath };
    } catch (error) {
        console.error('Error saving image to the database:', error);
        throw error;
    }
}

async function saveBasket(title, description, sum, freeAmount, image = null) {
    try {
        const query = `
            INSERT INTO baskets (title, description, sum, freeAmount, image)
            VALUES ($1, $2, $3, $4, $5) RETURNING id
        `;
        const params = [title, description, sum, freeAmount, image];

        const result = await create_query(query, params);
        return { id: result.rows[0].id, title, description, sum, freeAmount, image };
    } catch (error) {
        console.error('Error saving basket to the database:', error);
        throw error;
    }
}

async function deleteBasketFromDB(id) {
    try {
        const query = 'DELETE FROM baskets WHERE id = $1 RETURNING id';
        const params = [id];
        const result = await create_query(query, params);
        return result.rowCount > 0; // מחזיר true אם נמחק בהצלחה
    } catch (error) {
        console.error('Error deleting basket:', error);
        throw error;
    }
}

module.exports = { getAllBaskets, uploadImageToDB, saveBasket, deleteBasketFromDB };
