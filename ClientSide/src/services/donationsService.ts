// import axios from "axios";

// const API_URL = "https://daatmeirnew.onrender.com/donation"; // עדכן לפי כתובת ה-API שלך

// export const saveDonations = async (donations: any[]) => {
//     try {
//         const response = await axios.post(`${API_URL}/save-donation`, { donations });

//         return response.data;
//     } catch (error) {
//         console.error("❌ Error saving donations:", error);
//         throw error;
//     }
// };
// // 🔹 שליפת כל התרומות מהשרת
// export const fetchDonations = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/all`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching donations:", error);
//         throw error;
//     }
// };



import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/donation`;

// 🔹 שמירת תרומות
export const saveDonations = async (donations: any[]) => {
    try {
        const response = await axios.post(`${API_URL}/save-donation`, { donations });
        return response.data;
    } catch (error) {
        console.error("❌ Error saving donations:", error);
        throw error;
    }
};

// 🔹 שליפת כל התרומות מהשרת
export const fetchDonations = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        console.log("🌍 API_URL:", process.env.REACT_APP_API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching donations:", error);
        throw error;
    }
};
