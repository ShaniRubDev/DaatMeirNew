const { get_query, create_query } = require('../db');

// 🔹 פונקציה להוספת תרומה חדשה
const createDonation = async (donor_id, amount, donation_date, frequency, purpose, notes) => {
    const query = `
        INSERT INTO donations (donor_id, amount, donation_date, frequency, purpose, notes) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [donor_id, amount, donation_date, frequency, purpose, notes];

    try {
        const result = await create_query(query, params);
        return { id: result.insertId, donor_id, amount, donation_date, frequency, purpose, notes };
    } catch (error) {
        console.error("❌ Error creating donation:", error);
        throw error;
    }
};

// 🔹 פונקציה לקבלת כל התרומות
const getAllDonations = async () => {
    const query = ` SELECT d.id, d.amount, d.donation_date, d.frequency, d.purpose, d.notes, 
                   donors.first_name, donors.last_name 
            FROM donations d
            JOIN donors ON d.donor_id = donors.id
            ORDER BY d.donation_date DESC;`;
    try {
        return await get_query(query);
    } catch (error) {
        console.error("❌ Error fetching donations:", error);
        throw error;
    }
};

// 🔹 פונקציה לקבלת תרומות לפי תורם מסוים
const getDonationsByDonor = async (donor_id) => {
    const query = `SELECT * FROM donations WHERE donor_id = ?`;
    try {
        return await get_query(query, [donor_id]);
    } catch (error) {
        console.error("❌ Error fetching donations for donor:", error);
        throw error;
    }
};

module.exports = { createDonation, getAllDonations, getDonationsByDonor };
