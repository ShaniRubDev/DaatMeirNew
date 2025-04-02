// // import React, { useEffect, useState } from 'react';
// // import { getActiveAnnouncement } from '../../services/announcementService'; // ייבוא הפונקציה
// // import './Announcement.scss';
// // import { Annotation } from 'jspdf';
// // import { AnnouncementsModel } from '../../models/AnnouncementsModel'

// // const Announcement = () => {
// //   const [announcement, setAnnouncement] = useState<AnnouncementsModel>();

// //   useEffect(() => {
// //     const fetchAnnouncement = async () => {
// //       try {
// //         const data = await getActiveAnnouncement(); // קריאה לפונקציה מה-service
// //         setAnnouncement(data); // עדכון המודעה בסטייט
// //       } catch (error) {
// //         console.error("Error fetching announcement", error);
// //       }
// //     };

// //     fetchAnnouncement();
// //   }, []);

// //   if (!announcement) {
// //     return <div>טוען את המודעה...</div>; // אם אין הודעה להציג, מציגים טקסט של טוען
// //   }

// //   return (
// //     <div className="announcement-container">
// //       <div className="announcement-card">
// //         <h2>{announcement.title}</h2>
// //         <h2 className="announcement-title">{announcement.content}</h2>
// //       </div>
// //     </div>
// //   );
// // };

// // // export default Announcement;
// // Announcement.tsx
// import React, { useEffect, useState } from 'react';
// import { getActiveAnnouncement } from '../../services/announcementService'; // ייבוא הפונקציה
// import './Announcement.scss';
// import { useNavigate } from 'react-router-dom'; // ייבוא ה- useNavigate

// const Announcement = () => {
//   const [announcement, setAnnouncement] = useState<any>(null);
//   const [showAnnouncement, setShowAnnouncement] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAnnouncement = async () => {
//       try {
//         const data = await getActiveAnnouncement(); // קריאה לפונקציה מה-service
//         setAnnouncement(data); // עדכון המודעה בסטייט
//       } catch (error) {
//         console.error("Error fetching announcement", error);
//       }
//     };

//     fetchAnnouncement();

//     // אחרי 20 שניות נסגור את ההודעה
//     const timer = setTimeout(() => {
//       setShowAnnouncement(false);
//     }, 20000);

//     return () => clearTimeout(timer); // ניקוי הטיימר במקרה של הרכבה מחדש של הקומפוננטה
//   }, []);

//   const handleCloseAnnouncement = () => {
//     setShowAnnouncement(false); // סגירת ההודעה
//   };

//   if (!announcement) {
//     return <div></div>; // אם אין הודעה להציג, מציגים טקסט של טוען
//   }

//   return (
//     <>
//       {showAnnouncement && (
//         <div className="announcement-popup">
//           <div className="announcement-card">
//             <h2>{announcement.title}</h2>
//             <p>{announcement.content}</p>
//             <button onClick={() => navigate('/donation')} className="announcement-button">תרום עכשיו</button>
//             <button onClick={handleCloseAnnouncement} className="close-button">X</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Announcement;
// Announcement.tsx
import React, { useEffect, useState } from 'react';
import { getActiveAnnouncement } from '../../services/announcementService';
import './Announcement.scss';
import { useNavigate } from 'react-router-dom';

const Announcement = () => {
  const [announcement, setAnnouncement] = useState<any>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const data = await getActiveAnnouncement();
        setAnnouncement(data[0]);
        console.log(data)
      } catch (error) {
        console.error("Error fetching announcement", error);
      }
    };

    fetchAnnouncement();

    const timer = setTimeout(() => {
      setShowAnnouncement(false);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false);
  };

  if (!announcement) {
    return <div></div>;
  }

  return (
    <>
      {showAnnouncement && (
        <div className="announcement-popup">
          <div className="announcement-card">
            <h2>{announcement.title}</h2>
            <p>{announcement.content}</p>
            <div className="announcement-buttons">
              <button onClick={() => navigate('/donation')} className="announcement-button">
                תרום עכשיו
              </button>
              <button onClick={handleCloseAnnouncement} className="close-button">X</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Announcement;
