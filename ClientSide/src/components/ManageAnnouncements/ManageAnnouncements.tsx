import React, { useState, useEffect, useRef } from "react";
import "./ManageAnnouncements.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import NavBar from "../NavBar/NavBar";
import { getAllAnnouncements, deleteAnnouncement } from "../../services/announcementService";
import {AnnouncementsModelFromService} from "../../models/AnnouncementsModel"
import { useNavigate } from "react-router-dom";

const ManageAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementsModelFromService[]>([]);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await getAllAnnouncements();
        setAnnouncements(response || []);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async (idA:number) => {
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
              subTitle={`תאריך התחלה: ${announcement.startDate} - תאריך סיום: ${announcement.endDate}`}
              className="announcement-card"
            >
              <p className="announcement-content">{announcement.content}</p>
              <p className="announcement-status">
                סטטוס: {announcement.isActive ? "פעיל" : "לא פעיל"}
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
      <button className="add-basket-btn" onClick={() => navigate("/add-masage")}>
        <i className="bi bi-plus-lg"></i>
      </button>
    </div>
  );
};

export default ManageAnnouncements;
