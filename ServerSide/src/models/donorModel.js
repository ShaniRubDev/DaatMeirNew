const { create_query, get_query } = require('../db'); // חיבור לשאילתות מסד הנתונים

// פונקציה לשמירת פרטי תורם
const saveDonor = async (firstName, lastName, phone, email, address) => {
    const query = `
        INSERT INTO donors (first_name, last_name, phone, email, address) 
        VALUES (?, ?, ?, ?, ?)`;
    const params = [firstName, lastName, phone, email, address];
    return await create_query(query, params);
};

// פונקציה לקרוא את פרטי התורם (אם יש צורך בעתיד)
const getDonors = async () => {
    const query = 'SELECT * FROM donors';
    return await get_query(query);
};

module.exports = { saveDonor, getDonors };
