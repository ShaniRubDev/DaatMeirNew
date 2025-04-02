import axios from "axios";

const API_URL = "http://localhost:5000/donor";

export const saveDonor = async (donorData: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/save-donor`, donorData);
    console.log("Donor saved:", response.data);
    return response.data; // מחזיר את הנתונים אם צריך להשתמש בהם
  } catch (error) {
    console.error("Error saving donor:", error);
    throw error;
  }
};

export const fetchDonors = async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;  // הנתונים שהשרת מחזיר
    } catch (error) {
      throw new Error("שגיאה בטעינת התורמים");
    }
  };