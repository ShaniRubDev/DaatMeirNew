import React, { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";
import { Toast } from 'primereact/toast'; // ייבוא של Toast
import { saveDonor } from '../../services/donor.service'
import { saveDonations } from "../../services/donationsService";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { clearCart } from "../../redux/cartSlice";


const PersonalDetailsForm: React.FC = () => {
    const location = useLocation();
    const amount = location.state?.amount || 0; // אם אין סכום, ברירת המחדל תהיה 0

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [paymentType, setPaymentType] = useState<"Ragil" | "HK">("Ragil");
    const [months, setMonths] = useState<string>("");
    const iframeRef = useRef<any>();
    const navigate = useNavigate();
    const [showComponent, setShowComponent] = useState(true);
    const toast = useRef<Toast>(null); // יצירת רפרנס ל-Toast
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);


    useEffect(() => {
        const messageListener = (event: MessageEvent) => {
            if (event.origin.includes("matara.pro")) {
                console.log("Message from iframe:", event.data);
                if (event.data?.Name === "Heightss") {
                    iframeRef.current.style.height = `${parseInt(event.data.Value) + 15}px`;
                }
                if (event.data.Value?.Status === 'OK') {
                    // handleSubmit();
                    // window.location.href = "/thenks";
                    // setTimeout(() => {
                    //     setShowComponent(false);
                    //     navigate("/thenks");
                    // }, 1000);

                    console.log("Payment successful! Saving donor details...");
                    if (!firstName || !lastName || !phone || !email || !address) {
                        console.error("❌ Missing required donor fields!");
                        toast.current?.show({
                            severity: "error",
                            summary: "שגיאה",
                            detail: "אנא מלא את כל השדות לפני ביצוע התשלום.",
                            life: 5000,
                        });
                        return;
                    }
                    // try {
                    //     const donorData = { firstName, lastName, phone, email, address };
                    handlePaymentSuccess(); // קריאה לפונקציה אסינכרונית

                }
                else if (event.data.Value?.Status === "Error") {
                    // handlePaymentSuccess(); // קריאה לפונקציה אסינכרונית
                    if (!firstName || !lastName || !phone || !email || !address) {
                        console.error("❌ Missing required donor fields!");
                        toast.current?.show({
                            severity: "error",
                            summary: "שגיאה",
                            detail: "אנא מלא את כל השדות לפני ביצוע התשלום.",
                            life: 5000,
                        });
                        return;
                    }

                    // הצגת הודעת שגיאה ב-Toast
                    toast.current?.show({
                        severity: 'error',
                        summary: 'שגיאה בתשלום',
                        detail: 'שגיאה בביצוע התשלום. נסה שו ב',
                        life: 10000 // הזמן שההודעה תישאר על המסך (במילישניות)
                    });

                    //   setTimeout(() => setShowComponent(false), 1000);
                }
            }
        };

        window.addEventListener("message", messageListener);
        return () => window.removeEventListener("message", messageListener);
    }, [firstName, lastName, phone, email, address]);


    const handlePaymentSuccess = async () => {
        if (!firstName || !lastName || !phone || !email || !address) {
            console.error("Missing required donor fields!");
            toast.current?.show({
                severity: "error",
                summary: "שגיאה",
                detail: "אנא מלא את כל השדות לפני ביצוע התשלום.",
                life: 5000,
            });
            return; // לא שולחים בקשה אם יש שדות ריקים
        }

        try {
            const donorData = { firstName, lastName, phone, email, address };
            const response = await saveDonor(donorData);
            const donorId = response.donor.id;
            console.log(donorId)
            const donations = cartItems.map(item => ({
                donorId,
                amount: item.sum,
                frequency: paymentType === "HK" ? "קבוע" : "חד-פעמי", // ✅ קובע את התדירות לפי סוג התשלום
                destination: item.title,
                notes: null
            }));
            console.log(donations)
            // שליחת כל התרומות
            await saveDonations(donations);

            console.log("✅ Donations saved successfully!");
            dispatch(clearCart());
            navigate("/thenks");


            // console.log("Donor ID:", response.donor.insertId);



            // setTimeout(() => {
            //     setShowComponent(false);
            //     navigate("/thenks");
            // }, 1000);
        } catch (error) {
            console.error("Error saving donor or donations:", error);
        }
    };


    // const handleSubmit = async () => {
    //     try {
    //         const response = await axios.post("http://localhost:5000/donor/save-donor", {
    //             firstName,
    //             lastName,
    //             phone,
    //             email,
    //             address,
    //         });
    //         console.log("Donor saved:", response.data);
    //         donorId = response.data.donor.id; // קבלת ה-ID של התורם
    //         console.log(donorId);

    //     } catch (error) {
    //         console.error("Error saving donor:", error);
    //     }
    // };

    const handlePayment = () => {
        const iframe = document.getElementById("NedarimFrame") as HTMLIFrameElement;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
                {
                    Name: "FinishTransaction2",
                    Value: {
                        Mosad: "7013230",
                        ApiValid: "A1iMKiIXRo",
                        Zeout: "",
                        PaymentType: paymentType,
                        Currency: "1",
                        FirstName: firstName,
                        LastName: lastName,
                        Street: address,
                        City: "",
                        Phone: phone,
                        Mail: email,
                        Amount: amount,
                        Tashlumim: paymentType === "HK" && months ? months : "1",
                        Comment: "תרומה דרך האתר",
                        Groupe: "",
                        Param1: "",
                        Param2: "",
                        CallBack: "https://scrolls-website.onrender.com/paymentApi/payment-callback",
                        CallBackMailError: "s0556737348@gmail.com"
                    },
                },
                "*"
            );
        } else {
            console.error("Iframe not found or contentWindow is unavailable.");
        }
    };


    if (!showComponent) return null;

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "40px", borderRadius: "15px", boxShadow: "0 0 20px rgba(0,0,0,0.1)", backgroundColor: "#f9f9f9" }}>
            <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>
                מלא את פרטיך האישיים
            </h2>

            {/* Toast עבור הודעות */}
            <Toast ref={toast} />

            <div className="p-fluid" style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "16px", color: "#34495e" }}>שם פרטי:</label>
                <InputText value={firstName} onChange={(e) => setFirstName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }} />
            </div>

            <div className="p-fluid" style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "16px", color: "#34495e" }}>שם משפחה:</label>
                <InputText value={lastName} onChange={(e) => setLastName(e.target.value)} style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }} />
            </div>

            <div className="p-fluid" style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "16px", color: "#34495e" }}>כתובת:</label>
                <InputText
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }}
                />
            </div>

            <div className="p-fluid" style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "16px", color: "#34495e" }}>טלפון:</label>
                <InputMask mask="999999999" value={phone} onChange={(e) => setPhone(e.value || "")} style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }} />
            </div>

            <div className="p-fluid" style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "16px", color: "#34495e" }}>מייל:</label>
                <InputText
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }}
                />
            </div>

            <h3 style={{ textAlign: "center", color: "#2980b9", fontSize: "20px" }}>סכום לתשלום: {amount} ₪</h3>

            <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                <Button
                    label="תשלום חד-פעמי"
                    onClick={() => setPaymentType("Ragil")}
                    className={paymentType === "Ragil" ? "p-button-primary" : "p-button-outlined"}
                    style={{ marginRight: "10px" }}
                />
                <Button
                    label="הוראת קבע"
                    onClick={() => setPaymentType("HK")}
                    className={paymentType === "HK" ? "p-button-primary" : "p-button-outlined"}
                />
            </div>

            {paymentType === "HK" && (
                <div className="p-fluid" style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "16px", color: "#34495e" }}>מספר חודשים:</label>
                    <InputText
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }}
                        type="number"
                        min="1"
                        placeholder="הכנס מספר חודשים"
                    />
                </div>
            )}

            <iframe
                id="NedarimFrame"
                style={{
                    width: "100%",
                    height: "450px",
                    border: "none",
                    borderRadius: "10px",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
                    marginTop: "20px",
                }}
                src="https://matara.pro/nedarimplus/iframe?language=he"
            ></iframe>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
                <Button label="אישור תשלום" onClick={handlePayment} className="p-button-success" style={{ padding: "10px 20px", fontSize: "16px", borderRadius: "5px" }} />
            </div>
        </div>
    );
};

export default PersonalDetailsForm;
