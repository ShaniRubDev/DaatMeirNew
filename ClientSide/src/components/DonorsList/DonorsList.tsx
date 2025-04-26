import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';  // יבוא ספריית אקסל
import { fetchDonors } from "../../services/donor.service";  // שירות API

const DonorsList = () => {
    const [donors, setDonors] = useState<any[]>([]);  // כאן נשמור את כל התורמים
    const [filteredDonors, setFilteredDonors] = useState<any[]>([]);  // תורמים מסוננים לפי חיפוש
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");  // חיפוש לפי שם
    const navigate = useNavigate();

    useEffect(() => {
        const loadDonors = async () => {
            try {
                const data = await fetchDonors(); // טוענים את התורמים
                setDonors(data);
                setFilteredDonors(data);  // מציבים את כל התורמים גם כמסוננים בהתחלה
            } catch (err) {
                setError("שגיאה בטעינת התורמים");
            } finally {
                setLoading(false);
            }
        };

        loadDonors();
    }, []);
    const formatDate = (isoDate: any) => {
        console.log(isoDate)
        const date = new Date(isoDate);
        console.log(date.toLocaleDateString("he-IL"))

        return date.toLocaleDateString("he-IL");  // תאריך בפורמט עברי
    };
    const handleExportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredDonors);  // יצירת גיליון אקסל
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Donors");
        XLSX.writeFile(wb, "donors.xlsx");  // הורדת קובץ אקסל
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);  // עדכון ערך החיפוש
        const filtered = donors.filter(donor =>
            `${donor.first_name} ${donor.last_name}`
                .toLowerCase()
                .includes(e.target.value.toLowerCase())  // חיפוש לפי שם מלא
        );
        setFilteredDonors(filtered);  // עדכון התורמים המסוננים
    };

    if (loading) return <p>טוען נתונים...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2> רשימת תורמים</h2>

            <input
                type="text"
                placeholder="חפש לפי שם תורם"
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: "20px", padding: "5px", width: "100%" }}
            />

            <button onClick={handleExportToExcel} style={{ marginBottom: "20px" }} className="donate-button">
                ייצוא לאקסל
            </button>

            <table className="table table-bordered table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>שם תורם</th>
                        <th>טלפון</th>
                        <th>אימייל</th>
                        <th>כתובת</th>
                        <th>תאריך הצטרפות</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDonors.length > 0 ? (
                        filteredDonors.map((donor) => (
                            <tr key={donor.id}>
                                <td>{donor.first_name} {donor.last_name}</td>
                                <td>{donor.phone || "לא צוין"}</td>
                                <td>{donor.email}</td>
                                <td>{donor.address || "לא צוין"}</td>
                                <td>{donor.createdat}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center">לא נמצאו תורמים</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div style={{ position: "absolute", top: "150px", right: "20px" }}>
                <button className="back-manage-btn" onClick={() => navigate("/manage-area")}>
                    <i className="bi bi-arrow-right" style={{ marginLeft: "8px" }}></i>
                    חזרה לאזור ניהול אישי
                </button>
            </div>
        </div>
    );
};

export default DonorsList;
