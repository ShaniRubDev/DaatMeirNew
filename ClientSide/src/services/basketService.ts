// import axios from "axios";

// export const submitBasket = async (formData: FormData): Promise<any> => {
//     const response = await fetch("https://daatmeirnew.onrender.com/basket/addBasket", {
//       method: "POST",
//       body: formData, // שליחה של ה-FormData
//     });
  
//     if (!response.ok) {
//       throw new Error("Failed to submit basket");
//     }
  
//     return response;
//   };
  
//   export const getDonationOptions = async () => {
//     try {
//       const response = await axios.get("https://daatmeirnew.onrender.com/basket/getBasket"); // הנתיב המתאים
//       console.log(`you get the response`+response.data)
//       return response.data;
//        // מחזיר את רשימת התרומות
//     } catch (error) {
//       console.error("Error fetching donation options:", error);
//       throw error; // זורק את השגיאה אם יש בעיה
//     }
//   };
  
//   export const deleteBasket = async (id: number) => {
//     try {
//       // const response = await axios.delete(`http://localhost:5000/basket/delete/${id}`);
//       const response = await axios.delete(`https://daatmeirnew.onrender.com/basket/deleteBasket/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error("Error deleting basket:", error);
//       throw error;
//     }
//   };


import axios from "axios";

const baseURL = `${process.env.REACT_APP_API_BASE_URL}/basket`;

export const submitBasket = async (formData: FormData): Promise<any> => {
  const response = await fetch(`${baseURL}/addBasket`, {
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
    const response = await axios.get(`${baseURL}/getBasket`);
    console.log(`you get the response` + response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching donation options:", error);
    throw error;
  }
};

export const deleteBasket = async (id: number) => {
  try {
    const response = await axios.delete(`${baseURL}/deleteBasket/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting basket:", error);
    throw error;
  }
};
