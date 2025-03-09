import axios from "axios";

export const submitBasket = async (formData: FormData): Promise<any> => {
    const response = await fetch("http://localhost:5000/basket/addBasket", {
      method: "POST",
      body: formData, // שליחה של ה-FormData
    });
  
    if (!response.ok) {
      throw new Error("Failed to submit basket");
    }
  
    return response;
  };
  
  export const getDonationOptions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/basket/getBasket"); // הנתיב המתאים
      console.log(response.data.basekt)
      return response.data.basket; // מחזיר את רשימת התרומות
    } catch (error) {
      console.error("Error fetching donation options:", error);
      throw error; // זורק את השגיאה אם יש בעיה
    }
  };
  