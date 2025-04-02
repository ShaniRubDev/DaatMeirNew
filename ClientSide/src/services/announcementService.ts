import axios from 'axios';


// פונקציה לקבלת המודעה הפעילה
const basePath = 'http://localhost:5000/announcements'
export const getActiveAnnouncement = async () => {
    try {
        const response = await axios.get(`${basePath}/active`);
        return response.data; // מחזירים את הנתונים של המודעה
    } catch (error) {
        console.error('Error fetching announcement:', error);
        throw error; // זורקים שגיאה אם קרתה
    }
};
export const createAnnouncement = async (announcementData: {
    title: string;
    content: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
}) => {
    try {
        const response = await axios.post(`${basePath}/create`, announcementData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating announcement", error);
        throw error;
    }
};
export const getAllAnnouncements = async () => {
    try {
        const response = await axios.get(`${basePath}/all`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching all announcements:', error);
        throw error;
    }

};
export const deleteAnnouncement = async (announcementId:number) => {
    try {
      const response = await axios.delete(`${basePath}/delete/${announcementId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting announcement:', error);
      throw error;
    }
  };