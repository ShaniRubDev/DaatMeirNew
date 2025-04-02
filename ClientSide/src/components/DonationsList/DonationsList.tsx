// import React, { useEffect, useState } from "react";
// import * as XLSX from 'xlsx';  // יבוא ספריית אקסל
// import { DonationFromServise } from '../../models/DonationFromServise'
// import { fetchDonations } from "../../services/donationsService";

// const DonationsList = () => {
//     const [donations, setDonations] = useState<DonationFromServise[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const loadDonations = async () => {
//             try {
//                 const data = await fetchDonations(); // לא שולחים חיפוש
//                 setDonations(data);
//             } catch (err) {
//                 setError("שגיאה בטעינת התרומות");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadDonations();
//     }, []);

//     const handleExportToExcel = () => {
//         const ws = XLSX.utils.json_to_sheet(donations);  // יצירת גיליון אקסל
//         const wb = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(wb, ws, "Donations");
//         XLSX.writeFile(wb, "donations.xlsx");  // הורדת קובץ אקסל
//     };

//     if (loading) return <p>טוען נתונים...</p>;
//     if (error) return <p style={{ color: "red" }}>{error}</p>;

//     return (
//         <div>
//             <h2> רשימת תרומות</h2>

//             <button onClick={handleExportToExcel} style={{ marginBottom: "20px" }}>
//                 ייצוא לאקסל
//             </button>

//             <table className="table table-bordered table-striped table-hover">
//                 <thead className="thead-dark">
//                     <tr>
//                         <th>שם תורם</th>
//                         <th>סכום</th>
//                         <th>תאריך תרומה</th>
//                         <th>תדירות</th>
//                         <th>ייעוד התרומה</th>
//                         <th>הערות</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {donations.length > 0 ? (
//                         donations.map((donation) => (
//                             <tr key={donation.id}>
//                                 <td>{donation.first_name} {donation.last_name}</td>
//                                 <td>{donation.amount} ₪</td>
//                                 <td>{new Date(donation.donation_date).toLocaleDateString()}</td>
//                                 <td>{donation.frequency === "one-time" ? "חד-פעמי" : "קבוע"}</td>
//                                 <td>{donation.purpose || "לא צוין"}</td>
//                                 <td>{donation.notes || "ללא"}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan={6} className="text-center">לא נמצאו תרומות</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default DonationsList;


import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';  // יבוא ספריית אקסל
import { DonationFromServise } from '../../models/DonationFromServise'
import { fetchDonations } from "../../services/donationsService";

const DonationsList = () => {
    const [donations, setDonations] = useState<DonationFromServise[]>([]);
    const [filteredDonations, setFilteredDonations] = useState<DonationFromServise[]>([]);  // תרומות מסוננות
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");  // חיפוש לפי שם

    useEffect(() => {
        const loadDonations = async () => {
            try {
                const data = await fetchDonations(); // לא שולחים חיפוש
                setDonations(data);
                setFilteredDonations(data);  // מציבים את כל התרומות גם כמסוננות בהתחלה
            } catch (err) {
                setError("שגיאה בטעינת התרומות");
            } finally {
                setLoading(false);
            }
        };

        loadDonations();
    }, []);

    const handleExportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredDonations);  // יצירת גיליון אקסל
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Donations");
        XLSX.writeFile(wb, "donations.xlsx");  // הורדת קובץ אקסל
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);  // עדכון ערך החיפוש
        const filtered = donations.filter(donation =>
            `${donation.first_name} ${donation.last_name}`
                .toLowerCase()
                .includes(e.target.value.toLowerCase())  // חיפוש לפי שם מלא
        );
        setFilteredDonations(filtered);  // עדכון התרומות המסוננות
    };

    if (loading) return <p>טוען נתונים...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2> רשימת תרומות</h2>

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
                        <th>סכום</th>
                        <th>תאריך תרומה</th>
                        <th>תדירות</th>
                        <th>ייעוד התרומה</th>
                        <th>הערות</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDonations.length > 0 ? (
                        filteredDonations.map((donation) => (
                            <tr key={donation.id}>
                                <td>{donation.first_name} {donation.last_name}</td>
                                <td>{donation.amount} ₪</td>
                                <td>{new Date(donation.donation_date).toLocaleDateString()}</td>
                                <td>{donation.frequency === "one-time" ? "חד-פעמי" : "קבוע"}</td>
                                <td>{donation.purpose || "לא צוין"}</td>
                                <td>{donation.notes || "ללא"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center">לא נמצאו תרומות</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DonationsList;
