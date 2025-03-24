const donorModel = require('../models/donorModel');

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

module.exports = { saveDonor };
