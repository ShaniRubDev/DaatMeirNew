const donorModel = require('../models/donorModel');
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // חודש נמדד מ-0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};
// פונקציה לשמירת פרטי התורם
const saveDonor = async (req, res) => {
    const { firstName, lastName, phone, email, address } = req.body;

    if (!firstName || !lastName || !phone || !email) {
        return res.status(400).json({ error: "כל השדות חייבים להיות מלאים" });
    }

    try {
        const result = await donorModel.saveDonor(firstName, lastName, phone, email, address);
        res.status(200).json({ message: "הפרטים נשמרו בהצלחה", donor: result });
    } catch (error) {
        console.error("Error saving donor:", error);
        res.status(500).json({ error: "שגיאה בשמירת הנתונים" });
    }
};
const getAllDonars = async (req, res) => {
    try {
        const donors = await donorModel.getDonors();
        console.log(donors)
        const formattedDonors = donors.map(donor => {
            return {
                ...donor,
                createdat: formatDate(donor.createdat)  // המרת createdat לפורמט קריא
            };
        });

        console.log(formattedDonors);  // הצגת הנתונים המפורמטים
        res.status(200).json(formattedDonors);  // החזרת הנתונים המפורמטים ללקוח
        // res.status(200).json(donors);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { saveDonor ,getAllDonars };
