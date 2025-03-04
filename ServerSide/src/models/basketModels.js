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

async function uploadImage(titel, description, sum, imagePath,freeAmount) {
    try {
        // כותב שאילתת INSERT למסד הנתונים כדי לשמור את פרטי הסל עם התמונה
        const query = 'INSERT INTO baskets (titel,description, sum, image,  freeAmount) VALUES ( ?, ?, ?,?,?)';
        const params = [titel, description, sum, imagePath,freeAmount];
        
        // מבצע את השאילתה
        await create_query(query, params);
    } catch (error) {
        console.error('Error saving image to the database:', error);
        throw error; // זורק שגיאה אם משהו לא עובד
    }
}


module.exports = { getAllBaskets,uploadImage };