import React, { FC, useState } from 'react';
import './AddAnnouncement.scss';
import { createAnnouncement } from '../../services/announcementService'; // פונקציה לשליחת המודעה ל-API

interface AddAnnouncementProps {}

const AddAnnouncement: FC<AddAnnouncementProps> = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState(true);

  // פונקציה לשליחת המודעה ל-API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!startDate || !endDate) {
        alert('אנא מלא את כל השדות');
        return;
      }

      const newAnnouncement = {
        title,
        content,
        startDate: startDate.toISOString(), // המרת תאריך לפורמט ISO
        endDate: endDate.toISOString(),     // המרת תאריך לפורמט ISO
        isActive,
      };
      await createAnnouncement(newAnnouncement); // קריאה לפונקציה שתשלח את המודעה
      alert("המודעה נוצרה בהצלחה!");
      // איפוס השדות לאחר שליחה
      setTitle('');
      setContent('');
      setStartDate(null);
      setEndDate(null);
      setIsActive(true);
    } catch (error) {
      console.error("Error creating announcement", error);
      alert("הייתה שגיאה בהוספת המודעה.");
    }
  };

  return (
    <div className="AddAnnouncement">
      <section className="announcement-form">
        <h2>הוסף מודעה חדשה</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">כותרת:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">תוכן המודעה:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">תאריך התחלה:</label>
            <input
              type="date"
              id="startDate"
              value={startDate ? startDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">תאריך סיום:</label>
            <input
              type="date"
              id="endDate"
              value={endDate ? endDate.toISOString().split('T')[0] : ''}
              onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="isActive">הפעלת המודעה:</label>
            <input
              type="checkbox"
              id="isActive"
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="cta-button">הוסף מודעה</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddAnnouncement;
