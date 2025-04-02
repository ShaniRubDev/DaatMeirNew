// const { get_query, create_query } = require('../db');

// async function createAnnouncement(title,content, startDate, endDate, isActive = true) {
//     try {
//         const query = `INSERT INTO announcements (title,content, startDate, endDate, isActive) VALUES (?,?, ?, ?, ?)`;
//         const params = [content, startDate, endDate, isActive];
//         const result = await create_query(query, params);
//         return { id: result.insertId, title,content, startDate, endDate, isActive };
//     } catch (error) {
//         console.error('❌ Error creating announcement:', error);
//         throw error;
//     }
// }

// async function getActiveAnnouncement() {
//     try {
//         const query = `SELECT * FROM announcements WHERE isActive = TRUE AND CURDATE() BETWEEN startDate AND endDate ORDER BY id DESC LIMIT 1`;
//         const result = await get_query(query);
//         return result.length > 0 ? result[0] : null;
//     } catch (error) {
//         console.error('❌ Error fetching active announcement:', error);
//         throw error;
//     }
// }

// async function getAllAnnouncements() {
//     try {
//         const query = `SELECT * FROM announcements ORDER BY createdAt DESC`;
//         const announcements = await get_query(query);
//         return announcements;
//     } catch (error) {
//         console.error('❌ Error fetching all announcements:', error);
//         throw error;
//     }
// }

// async function updateAnnouncementStatus(id, isActive) {
//     try {
//         const query = `UPDATE announcements SET isActive = ? WHERE id = ?`;
//         const params = [isActive, id];
//         const result = await create_query(query, params);
//         return result;
//     } catch (error) {
//         console.error('❌ Error updating announcement status:', error);
//         throw error;
//     }
// }

// async function deleteAnnouncement(id) {
//     try {
//         const query = `DELETE FROM announcements WHERE id = ?`;
//         const params = [id];
//         const result = await create_query(query, params);
//         return result;
//     } catch (error) {
//         console.error('❌ Error deleting announcement:', error);
//         throw error;
//     }
// }

// module.exports = { 
//     createAnnouncement, 
//     getActiveAnnouncement, 
//     getAllAnnouncements, 
//     updateAnnouncementStatus, 
//     deleteAnnouncement 
// };

const { get_query, create_query } = require('../db');

async function createAnnouncement(title, content, startDate, endDate, isActive = true) {
    try {
        const query = `INSERT INTO announcements (title, content, startDate, endDate, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING id`;
        const params = [title, content, startDate, endDate, isActive];
        const result = await create_query(query, params);
        return { id: result.rows[0].id, title, content, startDate, endDate, isActive };
    } catch (error) {
        console.error('❌ Error creating announcement:', error);
        throw error;
    }
}

// async function getActiveAnnouncement() {
//     try {
//         const query = `SELECT * FROM announcements WHERE isActive = TRUE AND CURRENT_DATE BETWEEN startDate AND endDate ORDER BY id DESC LIMIT 1`;
//         const result = await get_query(query);
//         console.log("you get this from thr db")
//         console.log(result)
//         return ressult.rows.length > 0 ? result.rows: null;
//     } catch (error) {
//         console.error('❌ Error fetching active announcement:', error);
//         throw error;
//     }
// }

async function getActiveAnnouncement() {
    try {
        const query = `
            SELECT * 
            FROM announcements 
            WHERE isActive = TRUE 
              AND CURRENT_DATE BETWEEN startDate AND endDate 
            ORDER BY id DESC 
            LIMIT 1
        `;
        const result = await get_query(query);
        console.log("you get this from the db");
        console.log(result);
        return result.length > 0 ? result: null;
    } catch (error) {
        console.error('❌ Error fetching active announcement:', error);
        throw error;
    }
}


async function getAllAnnouncements() {
    try {
        const query = `SELECT * FROM announcements ORDER BY createdAt DESC`;
        const result = await get_query(query);
        console.log("you get this from thr db")
        console.log(result)
        // return ressult.rows.length > 0 ? result.rows: null;
        return result
    } catch (error) {
        console.error('❌ Error fetching all announcements:', error);
        throw error;
    }
}

async function updateAnnouncementStatus(id, isActive) {
    try {
        const query = `UPDATE announcements SET isActive = $1 WHERE id = $2`;
        const params = [isActive, id];
        await create_query(query, params);
        return { id, isActive };
    } catch (error) {
        console.error('❌ Error updating announcement status:', error);
        throw error;
    }
}

async function deleteAnnouncement(id) {
    try {
        const query = `DELETE FROM announcements WHERE id = $1`;
        const params = [id];
        await create_query(query, params);
        return { id };
    } catch (error) {
        console.error('❌ Error deleting announcement:', error);
        throw error;
    }
}

module.exports = {
    createAnnouncement,
    getActiveAnnouncement,
    getAllAnnouncements,
    updateAnnouncementStatus,
    deleteAnnouncement
};
