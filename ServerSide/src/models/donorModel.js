// const { create_query, get_query } = require('../db'); // חיבור לשאילתות מסד הנתונים

// // פונקציה לשמירת פרטי תורם
// const saveDonor = async (firstName, lastName, phone, email, address) => {
//     const query = `
//         INSERT INTO donors (first_name, last_name, phone, email, address) 
//         VALUES (?, ?, ?, ?, ?)`;
//     const params = [firstName, lastName, phone, email, address];

//     // return await create_query(query, params);
//     try {
//         // השתמש ב- get_query להוספה
//         const result = await create_query(query, params);
    

//         // החזרת ה-ID של התורם (insertId של התוצאה)
//         return { id: result.insertId };
//     } catch (error) {
//         console.error("Error saving donor:", error);
//         throw error;
//     }

// };

// // פונקציה לקרוא את פרטי התורם (אם יש צורך בעתיד)
// const getDonors = async () => {
//     const query = `  Select * from donors`;
//     return await get_query(query);
// };

// module.exports = { saveDonor, getDonors };
const { create_query, get_query } = require('../db'); // חיבור לשאילתות מסד הנתונים

// // פונקציה לשמירת פרטי תורם
// const saveDonor = async (firstName, lastName, phone, email, address) => {
//     const query = `
//         INSERT INTO donors (first_name, last_name, phone, email, address) 
//         VALUES ($1, $2, $3, $4, $5) RETURNING id`;  // שימוש בפרמטרים ממוספרים
//     const params = [firstName, lastName, phone, email, address];

//     try {
//         const result = await create_query(query, params);
        
//         // החזרת ה-ID של התורם (מ-RETURNING של PostgreSQL)
//         return { id: result[0].id };  // PostgreSQL מחזיר מערך, אז ניגש ל-id בעזרת result[0].id
//     } catch (error) {
//         console.error("Error saving donor:", error);
//         throw error;
//     }
// };
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // חודש נמדד מ-0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

// שימוש בתוך הפונקציה שמחזירה את התורמים:
const saveDonor = async (firstName, lastName, phone, email, address) => {
    const query = `
        INSERT INTO donors (first_name, last_name, phone, email, address) 
        VALUES ($1, $2, $3, $4, $5) RETURNING id, createdat`;  // החזרת createdat
    const params = [firstName, lastName, phone, email, address];

    try {
        const result = await create_query(query, params);
        
        // החזרת ה-ID של התורם והתאריך המפormat
        return { 
            id: result[0].id,
            createdat: formatDate(result[0].createdat)
        };
    } catch (error) {
        console.error("Error saving donor:", error);
        throw error;
    }
};

// פונקציה לקרוא את פרטי התורם (אם יש צורך בעתיד)
const getDonors = async () => {
    const query = `SELECT * FROM donors`;
    return await get_query(query);
};

module.exports = { saveDonor, getDonors };
