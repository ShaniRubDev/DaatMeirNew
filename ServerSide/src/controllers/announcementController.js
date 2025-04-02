// import { format, formatDistance, formatRelative, subDays } from 'date-fns'
const { format } = require('date-fns');
const { get_query, create_query } = require('../db');



const {
    createAnnouncement,
    getActiveAnnouncement,
    getAllAnnouncements,
    updateAnnouncementStatus,
    deleteAnnouncement
} = require('../models/announcementModel');

// פונקציה שממירה תאריך לפורמט YYYY-MM-DD
const formatDate = (date) => {
    if (!date) return null;
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        console.error("❌ תאריך לא חוקי:", date);
        return null;
    }
    return format(parsedDate, 'yyyy-MM-dd');
};

// async function create(req, res) {
//     try {
//         const { title, content, startDate, endDate, isActive } = req.body;
//         const formattedStartDate = formatDate(startDate);
//         const formattedEndDate = formatDate(endDate);
//         console.log(title, content, formattedStartDate, formattedEndDate, isActive)
//         const newAnnouncement = await createAnnouncement(title, content, formattedStartDate, formattedEndDate, isActive);

//         res.status(201).json({ message: "✅ המודעה נוספה בהצלחה!", newAnnouncement });
//     } catch (error) {
//         res.status(500).json({ message: "❌ שגיאה ביצירת מודעה" });
//     }
// }
// async function create(req, res) {
//     try {
//         const { title, content, startDate, endDate, isActive } = req.body;

//         const formattedStartDate = formatDate(startDate);
//         const formattedEndDate = formatDate(endDate);
//         const activeStatus = isActive ? 1 : 0; // הפיכת isActive לערך מספרי

//         console.log("📌 INSERT INTO DB:", {
//             title,
//             content,
//             formattedStartDate,
//             formattedEndDate,
//             isActive: activeStatus
//         });
//         console.log("🔍 typeof title:", typeof title);
//         console.log("🔍 typeof content:", typeof content);
//         console.log("🔍 typeof formattedStartDate:", typeof formattedStartDate);
//         console.log("🔍 typeof formattedEndDate:", typeof formattedEndDate);
//         console.log("🔍 typeof isActive:", typeof activeStatus);

//         const newAnnouncement = await createAnnouncement(title, content, formattedStartDate, formattedEndDate, activeStatus);

//         res.status(201).json({ message: "✅ המודעה נוספה בהצלחה!", newAnnouncement });
//     } catch (error) {
//         console.error("❌ שגיאה ביצירת מודעה:", error);
//         console.log('Error code:', error.code);
//         console.log('SQL:', error.sql);
//         console.log('SQL state:', error.sqlState);
//         console.log('Full error object:', error);
//         res.status(500).json({ message: "❌ שגיאה ביצירת מודעה" });
//     }
// }
// async function create(req, res) {
//     try {
//         // קבלת נתונים מהבקשה
//         const { title, content, startDate, endDate, isActive } = req.body;

//         // המרת תאריכים לפורמט הנדרש
//         const formattedStartDate = formatDate(startDate);
//         const formattedEndDate = formatDate(endDate);
//         const activeStatus = isActive ? 1 : 0; // הפיכת isActive לערך מספרי

//         // שאילתת SQL
//         const query_to_announce = `
//             INSERT INTO announcements (title, content, startDate, endDate, isActive) 
//             VALUES (?, ?, ?, ?, ?)
//         `;
//         const params = [title, content, formattedStartDate, formattedEndDate, activeStatus];

//         // שליחת השאילתה עם הפרמטרים המתאימים
//         const result = await get_query(query_to_announce, params);

//         // החזרת תשובה מוצלחת
//         res.status(201).json({ message: "✅ המודעה נוספה בהצלחה!", result });
//     } catch (error) {
//         // טיפול בשגיאה
//         console.log(`the error is: ${error}`);
//         res.status(500).json({ message: "❌ שגיאה ביצירת מודעה", error: error.message });
//     }
// }
async function create(req, res) {
    try {
        // קבלת נתונים מהבקשה
        const { title, content, startDate, endDate, isActive } = req.body;

        // המרת תאריכים לפורמט הנדרש
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        
        // שאילתת SQL
        const query_to_announce = `
            INSERT INTO announcements (title, content, startDate, endDate, isActive) 
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;
        const params = [title, content, formattedStartDate, formattedEndDate, isActive];

        // שליחת השאילתה עם הפרמטרים המתאימים
        const result = await create_query(query_to_announce, params);
        console.log("Query result:", result);
        // החזרת תשובה מוצלחת
        res.status(201).json({ message: "✅ המודעה נוספה בהצלחה!", result: result});
    } catch (error) {
        // טיפול בשגיאה
        console.log(`the error is: ${error}`);
        res.status(500).json({ message: "❌ שגיאה ביצירת מודעה", error: error.message });
    }
}

async function getActive(req, res) {
    try {
        const announcement = await getActiveAnnouncement();
        res.status(200).json(announcement);
    } catch (error) {
        res.status(500).json({ message: "❌ שגיאה בשליפת המודעה הפעילה" });
    }
}

async function getAll(req, res) {
    try {
        const announcements = await getAllAnnouncements();
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: "❌ שגיאה בשליפת כל המודעות" });
    }
}

async function updateStatus(req, res) {
    try {
        const { id, isActive } = req.body;
        await updateAnnouncementStatus(id, isActive);
        res.status(200).json({ message: "✅ הסטטוס של המודעה עודכן בהצלחה!" });
    } catch (error) {
        res.status(500).json({ message: "❌ שגיאה בעדכון הסטטוס" });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        await deleteAnnouncement(id);
        res.status(200).json({ message: "✅ המודעה נמחקה בהצלחה!" });
    } catch (error) {
        res.status(500).json({ message: "❌ שגיאה במחיקת המודעה" });
    }
}

module.exports = { create, getActive, getAll, updateStatus, remove };
