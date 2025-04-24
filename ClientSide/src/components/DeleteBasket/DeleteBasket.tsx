


// import React, { useState, useEffect, useRef } from "react";
// import "./DeleteBasket.scss";
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { useNavigate } from "react-router-dom";
// import { getDonationOptions, deleteBasket } from "../../services/basketService";
// import { DonationOption } from "../../models/DonationOption";

// const DeleteBasket = () => {
//     const [donationOptions, setDonationOptions] = useState<DonationOption[]>([]);
//     const [loadingIds, setLoadingIds] = useState<number[]>([]);
//     const navigate = useNavigate();
//     const toast = useRef<Toast>(null);

//     useEffect(() => {
//         const fetchDonationOptions = async () => {
//             try {
//                 const options = await getDonationOptions();
//                 setDonationOptions(options.basket || []);
//             } catch (error) {
//                 console.error("Error fetching donation options:", error);
//                 toast.current?.show({
//                     severity: "error",
//                     summary: "שגיאה",
//                     detail: "לא ניתן לטעון את הסלים",
//                     life: 3000,
//                 });
//             }
//         };

//         fetchDonationOptions();
//     }, []);

//     const handleDelete = async (id: number) => {
//         if (loadingIds.includes(id)) return;
//         setLoadingIds((prev) => [...prev, id]);
//         setDonationOptions((prev) => prev.filter((item) => item.id !== id));

//         try {
//             console.log(`Attempting to delete basket with ID: ${id}`);
//             await deleteBasket(id);
//             toast.current?.show({
//                 severity: "success",
//                 summary: "נמחק בהצלחה",
//                 detail: "הסל נמחק מהרשימה",
//                 life: 3000,
//             });
//         } catch (error:any) {
//             console.error("Error deleting basket:", error);
//             if (error.response?.status != 404) {
//                 toast.current?.show({
//                     severity: "error",
//                     summary: "שגיאה",
//                     detail: "הסל כבר לא קיים במערכת",
//                     life: 3000,
//                 })
//             }

//         } finally {
//             setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
//         }
//     };

//     return (
//         <div className="DeleteBasket">
//             <div className="donation-page">
//                 <h1 className="title">ניהול סלי צדקה</h1>
//                 <Toast ref={toast} position="top-right" />
//                 <div className="donation-grid">
//                     {donationOptions.length > 0 ? (
//                         donationOptions.map((option) => (
//                             <Card
//                                 key={option.id}
//                                 title={option.title}
//                                 subTitle={`${option.sum} ₪`}
//                                 header={<img alt={option.title} src={`https://daatmeirnew.onrender.com${option.image}`} className="donation-image" />}
//                                 className="donation-card"
//                             >
//                                 <p className="donation-description">{option.description}</p>
//                                 <Button
//                                     icon="pi pi-trash"
//                                     className="p-button-danger"
//                                     onClick={() => handleDelete(option.id)}
//                                     label="מחיקה"
//                                     disabled={loadingIds.includes(option.id)}
//                                 />
//                             </Card>
//                         ))
//                     ) : (
//                         <p className="no-baskets-message">אין סלים להצגה</p>
//                     )}
//                 </div>
//             </div>
//             <button className="add-basket-btn" onClick={() => navigate("/add-basket")}>
//                 <i className="bi bi-plus-lg"></i>
//             </button>
//         </div>
//     );
// };

// export default DeleteBasket;



import React, { useState, useEffect, useRef } from "react";
import "./DeleteBasket.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { getDonationOptions, deleteBasket } from "../../services/basketService";
import { DonationOption } from "../../models/DonationOption";

const DeleteBasket = () => {
    const [donationOptions, setDonationOptions] = useState<DonationOption[]>([]);
    const [loadingIds, setLoadingIds] = useState<number[]>([]);
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const baseURL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const fetchDonationOptions = async () => {
            try {
                const options = await getDonationOptions();
                setDonationOptions(options.basket || []);
            } catch (error) {
                console.error("Error fetching donation options:", error);
                toast.current?.show({
                    severity: "error",
                    summary: "שגיאה",
                    detail: "לא ניתן לטעון את הסלים",
                    life: 3000,
                });
            }
        };

        fetchDonationOptions();
    }, []);

    const handleDelete = async (id: number) => {
        if (loadingIds.includes(id)) return;
        setLoadingIds((prev) => [...prev, id]);
        setDonationOptions((prev) => prev.filter((item) => item.id !== id));

        try {
            console.log(`Attempting to delete basket with ID: ${id}`);
            await deleteBasket(id);
            toast.current?.show({
                severity: "success",
                summary: "נמחק בהצלחה",
                detail: "הסל נמחק מהרשימה",
                life: 3000,
            });
        } catch (error: any) {
            console.error("Error deleting basket:", error);
            if (error.response?.status != 404) {
                toast.current?.show({
                    severity: "error",
                    summary: "שגיאה",
                    detail: "הסל כבר לא קיים במערכת",
                    life: 3000,
                });
            }
        } finally {
            setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
        }
    };

    return (
        <div className="DeleteBasket">
            <div className="donation-page">
                <h1 className="title">ניהול סלי צדקה</h1>
                <Toast ref={toast} position="top-right" />
                <div className="donation-grid">
                    {donationOptions.length > 0 ? (
                        donationOptions.map((option) => (
                            <Card
                                key={option.id}
                                title={option.title}
                                subTitle={`${option.sum} ₪`}
                                header={
                                    <img
                                        alt={option.title}
                                        src={`${baseURL}${option.image}`}
                                        className="donation-image"
                                    />
                                }
                                className="donation-card"
                            >
                                <p className="donation-description">{option.description}</p>
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-danger"
                                    onClick={() => handleDelete(option.id)}
                                    label="מחיקה"
                                    disabled={loadingIds.includes(option.id)}
                                />
                            </Card>
                        ))
                    ) : (
                        <p className="no-baskets-message">אין סלים להצגה</p>
                    )}
                </div>
            </div>
            <button className="add-basket-btn" onClick={() => navigate("/add-basket")}>
                <i className="bi bi-plus-lg"></i>
            </button>
        </div>
    );
};

export default DeleteBasket;
