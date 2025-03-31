const { create_query, get_query } = require('../db'); // חיבור לשאילתות מסד הנתונים

// פונקציה לשמירת פרטי תורם
const saveDonor = async (firstName, lastName, phone, email, address) => {
    const query = `
        INSERT INTO donors (first_name, last_name, phone, email, address) 
        VALUES (?, ?, ?, ?, ?)`;
    const params = [firstName, lastName, phone, email, address];

    // return await create_query(query, params);
    try {
        // השתמש ב- get_query להוספה
        const result = await create_query(query, params);
    

        // החזרת ה-ID של התורם (insertId של התוצאה)
        return { id: result.insertId };
    } catch (error) {
        console.error("Error saving donor:", error);
        throw error;
    }

};

// פונקציה לקרוא את פרטי התורם (אם יש צורך בעתיד)
const getDonors = async () => {
    const query = 'SELECT * FROM donors';
    return await get_query(query);
};

module.exports = { saveDonor, getDonors };
