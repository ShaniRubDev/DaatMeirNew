// const DonationService = require('../services/donationService');

// // 🔹 שמירת תרומה חדשה
// const saveDonation = async (req, res) => {
//     try {
//         const { donor_id, amount, donation_date, frequency, purpose, notes } = req.body;
//         if (!donor_id || !amount || !donation_date || !frequency) {
//             return res.status(400).json({ message: "❌ Missing required fields" });
//         }

//         const newDonation = await DonationService.addDonation(donor_id, amount, donation_date, frequency, purpose, notes);
//         res.status(201).json({ message: "✅ Donation saved successfully!", donation: newDonation });

//     } catch (error) {
//         console.error("❌ Error saving donation:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // 🔹 קבלת כל התרומות
// const getAllDonations = async (req, res) => {
//     try {
//         const donations = await DonationService.getDonations();
//         res.status(200).json(donations);
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // 🔹 קבלת תרומות לפי תורם
// const getDonationsByDonor = async (req, res) => {
//     try {
//         const { donor_id } = req.params;
//         const donations = await DonationService.getDonationsByDonor(donor_id);
//         res.status(200).json(donations);
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = { saveDonation, getAllDonations, getDonationsByDonor };
const DonationModel = require('../models/donationModel');
const { get_query, create_query } = require('../db');

// 🔹 קבלת כל התרומות
const getAllDonations = async (req, res) => {
    try {
        const donations = await DonationModel.getAllDonations();
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};
// const saveDonations = async (req, res) => {
//     try {
//         const donations = req.body.donations; // מקבלים מערך של תרומות

//         if (!donations || donations.length === 0) {
//             return res.status(400).json({ message: "No donations provided" });
//         }

//         const cleanDonations = donations.map(donation => ({
//             donor_id: donation.donorId ?? null,
//             amount: donation.amount ?? 0,
//             frequency: donation.frequency === "חד-פעמי" ? "one-time" : "recurring",
//             purpose: donation.destination ?? null,
//             notes: donation.notes ?? ""
//         }));
//         console.log(`before flating`)
//         console.log(cleanDonations)

//         // יצירת מחרוזת שאילתא דינמית שמתאימה למספר התרומות
//         const insertQuery = `
//             INSERT INTO donations (donorId, amount, frequency, destination, notes) 
//             VALUES ${cleanDonations.map(() => "(?, ?, ?, ?, ?, ?)").join(", ")}
//         `;

//         // יצירת מערך נתונים שטוח שמתאים לפרמטרים של השאילתא
//         const values = cleanDonations.flatMap(donation => [
//             donation.donorId,
//             donation.amount,
//             donation.frequency,
//             donation.destination,
//             donation.notes || "" // ברירת מחדל למקרה שאין הערות
//         ]);
//         console.log(`after flating`)
//         console.log(values)
//         // שליחת השאילתא עם הפרמטרים
//         await create_query(insertQuery, values);

//         res.status(201).json({ message: "Donations saved successfully" });

//     } catch (error) {
//         console.error("Error saving donations:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// const saveDonations = async (req, res) => {
//     try {
//         const donations = req.body.donations; // מקבלים מערך של תרומות

//         if (!donations || donations.length === 0) {
//             return res.status(400).json({ message: "No donations provided" });
//         }

//         const cleanDonations = donations.map(donation => ({
//             donor_id: donation.donorId ,  // ❌ היה donorId במקום donor_id
//             amount: donation.amount ,
//             frequency: donation.frequency === "חד-פעמי" ? "one-time" : "recurring",
//             purpose: donation.purpose ?? null,  // ❌ היה destination במקום purpose
//             notes: donation.notes ?? ""
//         }));

//         console.log(`before flating`);
//         console.log(cleanDonations);

//         // יצירת שאילתת SQL דינמית
//         const insertQuery = `
//             INSERT INTO donations (donor_id, amount, frequency, purpose, notes) 
//             VALUES ${cleanDonations.map(() => "(?, ?, ?, ?, ?)").join(", ")}
//         `;

//         // יצירת מערך שטוח עם השמות הנכונים
//         const values = cleanDonations.flatMap(donation => [
//             donation.donor_id,  // ✅ היה donorId במקום donor_id
//             donation.amount,
//             donation.frequency,
//             donation.purpose,  // ✅ היה destination במקום purpose
//             donation.notes || "" 
//         ]);

//         console.log(`after flating`);
//         console.log(values);

//         // שליחת השאילתא עם הנתונים
//         await create_query(insertQuery, values);

//         res.status(201).json({ message: "Donations saved successfully" });

//     } catch (error) {
//         console.error("Error saving donations:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
const saveDonations = async (req, res) => {
    try {
        const donations = req.body.donations; // מקבלים מערך של תרומות

        if (!donations || donations.length === 0) {
            return res.status(400).json({ message: "No donations provided" });
        }

        const cleanDonations = donations.map(donation => ({
            donor_id: donation.donorId,
            amount: donation.amount,
            frequency: donation.frequency === "חד-פעמי" ? "one-time" : "recurring",
            purpose: donation.purpose ?? null,
            notes: donation.notes ?? ""
        }));

        console.log("before flating", cleanDonations);

        // יצירת שאילתת SQL דינמית
        const insertQuery = `
            INSERT INTO donations (donor_id, amount, frequency, purpose, notes) 
            VALUES ${cleanDonations
                .map(
                    (_, index) =>
                        `($${index * 5 + 1}, $${index * 5 + 2}, $${index * 5 + 3}, $${index * 5 + 4}, $${index * 5 + 5})`
                )
                .join(", ")}
            RETURNING id
        `;

        // יצירת מערך שטוח עם הערכים
        const values = cleanDonations.flatMap(donation => [
            donation.donor_id,
            donation.amount,
            donation.frequency,
            donation.purpose,
            donation.notes || ""
        ]);

        console.log("after flating", values);
        console.log("Final insert query:", insertQuery);  // הצגת השאילתא לוידוא תחביר

        // שליחת השאילתא עם הנתונים
        const result = await create_query(insertQuery, values);
        console.log("Inserted donation IDs:", result);  // הצגת תוצאות השאילתא

        res.status(201).json({ message: "Donations saved successfully", donations: result });

    } catch (error) {
        console.error("Error saving donations:", error);
        res.status(500).json({ message: "Server error" });
    }
};


// 🔹 קבלת תרומות לפי תורם מסוים
const getDonationsByDonor = async (req, res) => {
    try {
        const { donor_id } = req.params;
        const donations = await DonationModel.getDonationsByDonor(donor_id);
        res.status(200).json(donations);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAllDonations, getDonationsByDonor, saveDonations };
