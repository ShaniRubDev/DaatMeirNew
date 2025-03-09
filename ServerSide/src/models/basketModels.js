const { get_query, create_query } = require('../db')
const bcrypt = require("bcrypt");

async function getAllBaskets() {
    try {
        const query = 'SELECT * FROM baskets'; // התאימי את שם הטבלה
        const baskets = await get_query(query);
        console.log(`in model`+baskets)
        return baskets; // מחזיר את התוצאות
    } catch (error) {
        console.error('Error fetching baskets:', error);
        throw error;
    }
}

async function uploadImageToDB(title, description, sum, imagePath,freeAmount) {
    try {
        if (!imagePath) {
            throw new Error("Image path is missing!");
        }
        // כותב שאילתת INSERT למסד הנתונים כדי לשמור את פרטי הסל עם התמונה
        const query = 'INSERT INTO baskets (title,description, sum, image,  freeAmount) VALUES ( ?, ?, ?,?,?)';
        const params = [title, description, sum, imagePath,freeAmount];
        
        // מבצע את השאילתה
      const result =  await create_query(query, params);
      return { id: result.insertId, title, description, sum, freeAmount, image: imagePath };
    } catch (error) {
        console.error('Error saving image to the database:', error);
        throw error; // זורק שגיאה אם משהו לא עובד
    }
}
// שמירת סל גם בלי תמונה
async function saveBasket(title, description, sum, freeAmount, image = null) {
    try {
        const query = 'INSERT INTO baskets (title, description, sum, freeAmount, image) VALUES (?, ?, ?, ?, ?)';
        const params = [title, description, sum, freeAmount, image];

        const result = await create_query(query, params);
        return { id: result.insertId, title, description, sum, freeAmount, image };
    } catch (error) {
        console.error('Error saving basket to the database:', error);
        throw error;
    }
}


module.exports = { getAllBaskets,uploadImageToDB,saveBasket };