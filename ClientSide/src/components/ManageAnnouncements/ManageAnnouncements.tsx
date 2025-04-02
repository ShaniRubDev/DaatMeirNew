import React, { useState, useEffect, useRef } from "react";
import "./ManageAnnouncements.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import NavBar from "../NavBar/NavBar";
import { getAllAnnouncements, deleteAnnouncement } from "../../services/announcementService";
import { AnnouncementsModelFromService } from "../../models/AnnouncementsModel"
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { he } from 'date-fns/locale';

const ManageAnnouncements = () => {
    const [announcements, setAnnouncements] = useState<AnnouncementsModelFromService[]>([]);
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const formatDate = (date?: any| null) => {
        console.log(date)
        if (!date) return 'תאריך לא זמין'; // טיפול במקרה של ערך ריק
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) return 'תאריך לא תקף'; // טיפול במקרה שהתאריך לא חוקי
        return format(parsedDate, 'dd/MM/yyyy', { locale: he });
      };

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await getAllAnnouncements();
                console.log(`Announcements:+${response}`)
                setAnnouncements(response || []);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleDelete = async (idA: number) => {
        try {
            await deleteAnnouncement(idA);
            setAnnouncements((prev) => prev.filter((item) => item.id !== idA));
            toast.current?.show({
                severity: "success",
                summary: "נמחק בהצלחה",
                detail: "ההודעה נמחקה מהרשימה",
                life: 3000,
            });
        } catch (error) {
            console.error("Error deleting announcement:", error);
        }
    };

    return (
        <div className="ManageAnnouncements">
            <div className="announcement-page">
                <h1 className="title">ניהול הודעות</h1>
                <Toast ref={toast} position="top-right" />
                <div className="announcement-grid">
                    {announcements.map((announcement) => (
                        <Card
                            key={announcement.id}
                            title={announcement.title}
                            subTitle={`תאריך התחלה:${formatDate(announcement.startDate)} - 
              תאריך סיום: ${announcement.endDate ? new Date(announcement.endDate).toLocaleDateString('he-IL') : 'ללא תאריך סיום'}`}
                            className="announcement-card"
                        >
                            <p className="announcement-content">{announcement.content}</p>
                            <p className="announcement-status">
                                סטטוס: {announcement.isActive ? "לא פעיל":"פעיל" }
                            </p>
                            <Button
                                icon="pi pi-trash"
                                className="p-button-danger"
                                onClick={() => handleDelete(announcement.id)}
                                label="מחיקה"
                            />
                        </Card>
                    ))}
                </div>
            </div>
            <button className="add-mesage-btn" onClick={() => navigate("/add-masage")}>
                <i className="bi bi-plus-lg"></i>
            </button>
        </div>
    );
};

export default ManageAnnouncements;
