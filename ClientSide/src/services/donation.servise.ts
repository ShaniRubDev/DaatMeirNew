import axios from "axios";

// יצירת פונקציה שמבצעת את הבקשה לשרת ומחזירה את התוצאות
export const getDonationOptions = async () => {
  try {
    const response = await axios.get("/api/basket/getBasket"); // הנתיב המתאים
    return response.data.basket; // מחזיר את רשימת התרומות
  } catch (error) {
    console.error("Error fetching donation options:", error);
    throw error; // זורק את השגיאה אם יש בעיה
  }
};
