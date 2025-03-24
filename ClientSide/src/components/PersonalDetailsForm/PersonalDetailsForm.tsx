// import React, { useState, useEffect } from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { InputMask } from "primereact/inputmask";
// import axios from "axios";

// const PersonalDetailsForm = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [paymentType, setPaymentType] = useState("Ragil"); // ברירת מחדל לתשלום רגיל
//   const [tashlumim, setTashlumim] = useState(""); // מספר חודשים עבור הוראת קבע

//   useEffect(() => {
//     const formElements = document.querySelectorAll("input");
//     formElements.forEach((element) => {
//       switch (element.name) {
//         case "firstName":
//           setFirstName(element.value);
//           break;
//         case "lastName":
//           setLastName(element.value);
//           break;
//         case "phone":
//           setPhone(element.value);
//           break;
//         case "email":
//           setEmail(element.value);
//           break;
//         case "address":
//           setAddress(element.value);
//           break;
//         default:
//           break;
//       }
//     });
//   }, []);

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/donor/save-donor", {
//         firstName,
//         lastName,
//         phone,
//         email,
//         address,
//       });
//       console.log("Donor saved:", response.data);
//     } catch (error) {
//       console.error("Error saving donor:", error);
//     }
//   };

//   const handlePayment = ()  => {

//     const iframe = document.getElementById("NedarimFrame") as HTMLIFrameElement;
//     if (iframe && iframe.contentWindow) {
//       iframe.contentWindow.postMessage(
//         {
//           Name: "FinishTransaction2",
//           Value: {
//             Mosad: "7014113",
//             ApiValid: "5tezOx+JDY",
//             Zeout: "", // מספר תעודת זהות (להוסיף אם רלוונטי)
//             PaymentType: paymentType,
//             Currency: "1",
//             FirstName: firstName,
//             LastName: lastName,
//             Street: address,
//             City: "", // אפשר להוסיף עיר אם רוצים
//             Phone: phone,
//             Mail: email,
//             Amount: amount,
//             Tashlumim: paymentType === "HK" ? tashlumim || "" : "1", // מספר חודשים להוראת קבע או תשלום רגיל
//             Comment: "תשלום דרך האתר",
//             Groupe: "", // אפשר להוסיף קטגוריה אם יש צורך
//             Param1: "", // נתון חופשי לקאלבק
//             Param2: "", // נתון חופשי לקאלבק
//             CallBack: "https://scrolls-website.onrender.com/paymentApi/payment-callback", // כתובת לקבלת תגובה בסיום תשלום
//             CallBackMailError: "s0556737348@gmail.com", // מייל לקבלת שגיאות

//           },
//         },
//         "*"
//       );
//     } else {
//       console.error("Iframe not found or contentWindow is unavailable.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>מלא את פרטיך האישיים</h2>
//       <div className="p-fluid">
//         <label>שם פרטי:</label>
//         <InputText name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>שם משפחה:</label>
//         <InputText name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>טלפון:</label>
//         <InputMask name="phone" mask="(999) 999-9999" value={phone} onChange={(e) => setPhone(e.value || "")} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>אימייל:</label>
//         <InputText name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>כתובת מגורים:</label>
//         <InputText name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>סכום תרומה:</label>
//         <InputText value={amount} onChange={(e) => setAmount(e.target.value)} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>סוג תשלום:</label>
//         <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)} className="p-inputtext">
//           <option value="Ragil">תשלום רגיל</option>
//           <option value="HK">הוראת קבע</option>
//         </select>
//       </div>

//       {paymentType === "HK" && (
//         <div className="p-fluid">
//           <label>מספר חודשים (ריק = ללא הגבלה):</label>
//           <InputText value={tashlumim} onChange={(e) => setTashlumim(e.target.value)} className="p-inputtext" type="number" min="1" />
//         </div>
//       )}

//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
//         <Button label="שמירה" onClick={handleSubmit} className="p-button-primary" />
//         <Button label="לביצוע תשלום" onClick={handlePayment} className="p-button-success" />
//       </div>

//       <iframe
//         id="NedarimFrame"
//         style={{ width: "100%", height: "500px", border: "1px solid #ccc", marginTop: "20px", borderRadius: "5px" }}
//         src="https://matara.pro/nedarimplus/iframe?language=he"
//       ></iframe>
//     </div>
//   );
// };

// export default PersonalDetailsForm;
// export{}



// import React, { useState } from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { InputMask } from "primereact/inputmask";
// import axios from "axios";

// interface PersonalDetailsFormProps {
//   amount: number;
// }

// const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ amount }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/donor/save-donor", {
//         firstName,
//         lastName,
//         phone,
//         email,
//         address,
//       });
//       console.log("Donor saved:", response.data);
//     } catch (error) {
//       console.error("Error saving donor:", error);
//     }
//   };

//   const handlePayment = () => {
//     handleSubmit();
//     const iframe = document.getElementById("NedarimFrame") as HTMLIFrameElement;
//     if (iframe && iframe.contentWindow) {
//       iframe.contentWindow.postMessage(
//         {
//           Name: "FinishTransaction2",
//           Value: {
//             Mosad: "7014113",
//             ApiValid: "5tezOx+JDY",
//             Zeout: "",
//             PaymentType: "Ragil", // סוג תשלום רגיל
//             Currency: "1",
//             FirstName: firstName,
//             LastName: lastName,
//             Street: address,
//             City: "",
//             Phone: phone,
//             Mail: email,
//             Amount: amount,
//             Tashlumim: "1",
//             Comment: "תרומה דרך האתר",
//             Groupe: "",
//             Param1: "",
//             Param2: "",
//             CallBack: "https://scrolls-website.onrender.com/paymentApi/payment-callback",
//             CallBackMailError: "scrollsSite@gmail.com",
//           },
//         },
//         "*"
//       );
//     } else {
//       console.error("Iframe not found or contentWindow is unavailable.");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", backgroundColor: "#fff" }}>
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>מלא את פרטיך האישיים</h2>
//       <div className="p-fluid">
//         <label>שם פרטי:</label>
//         <InputText name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>שם משפחה:</label>
//         <InputText name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>טלפון:</label>
//         <InputMask name="phone" mask="(999) 999-9999" value={phone} onChange={(e) => setPhone(e.value || "")} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>אימייל:</label>
//         <InputText name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-inputtext" />
//       </div>
//       <div className="p-fluid">
//         <label>כתובת מגורים:</label>
//         <InputText name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="p-inputtext" />
//       </div>
//       <h3>סכום לתשלום: {amount} ₪</h3>

//       <iframe
//         id="NedarimFrame"
//         style={{ width: "100%", height: "500px", border: "1px solid #ccc", marginTop: "20px", borderRadius: "5px" }}
//         src="https://matara.pro/nedarimplus/iframe?language=he"
//       ></iframe>
//       <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
//         <Button label="אישור תשלום" onClick={handlePayment} className="p-button-success" />
//       </div>
//     </div>
//   );
// };

// export default PersonalDetailsForm;

import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import axios from "axios";

interface PersonalDetailsFormProps {
  amount: number;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ amount }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/donor/save-donor", {
        firstName,
        lastName,
        phone,
        email,
        address,
      });
      console.log("Donor saved:", response.data);
    } catch (error) {
      console.error("Error saving donor:", error);
    }
  };

  const handlePayment = () => {
    handleSubmit();
    const iframe = document.getElementById("NedarimFrame") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          Name: "FinishTransaction2",
          Value: {
            Mosad: "7014113",
            ApiValid: "5tezOx+JDY",
            Zeout: "",
            PaymentType: "Ragil", // סוג תשלום רגיל
            Currency: "1",
            FirstName: firstName,
            LastName: lastName,
            Street: address,
            City: "",
            Phone: phone,
            Mail: email,
            Amount: amount,
            Tashlumim: "1",
            Comment: "תרומה דרך האתר",
            Groupe: "",
            Param1: "",
            Param2: "",
            CallBack: "https://scrolls-website.onrender.com/paymentApi/payment-callback",
            CallBackMailError: "scrollsSite@gmail.com",
          },
        },
        "*"
      );
    } else {
      console.error("Iframe not found or contentWindow is unavailable.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "40px", borderRadius: "15px", boxShadow: "0 0 20px rgba(0,0,0,0.1)", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px", fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>מלא את פרטיך האישיים</h2>
      
      <div className="p-fluid" style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#34495e" }}>שם פרטי:</label>
        <InputText name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-inputtext p-inputtext-sm" style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }} />
      </div>
      
      <div className="p-fluid" style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#34495e" }}>שם משפחה:</label>
        <InputText name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-inputtext p-inputtext-sm" style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }} />
      </div>
      
      <div className="p-fluid" style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#34495e" }}>טלפון:</label>
        <InputMask name="phone" mask="(999) 999-9999" value={phone} onChange={(e) => setPhone(e.value || "")} className="p-inputtext p-inputtext-sm" style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }} />
      </div>
      
      <div className="p-fluid" style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#34495e" }}>אימייל:</label>
        <InputText name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-inputtext p-inputtext-sm" style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }} />
      </div>
      
      <div className="p-fluid" style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#34495e" }}>כתובת מגורים:</label>
        <InputText name="address" value={address} onChange={(e) => setAddress(e.target.value)} className="p-inputtext p-inputtext-sm" style={{ width: "100%", padding: "10px", borderRadius: "5px", borderColor: "#ddd" }} />
      </div>

      <h3 style={{ textAlign: "center", color: "#2980b9", fontSize: "20px", fontFamily: "Arial, sans-serif" }}>סכום לתשלום: {amount} ₪</h3>

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
