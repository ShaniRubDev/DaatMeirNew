// import { useEffect, useRef } from "react";

// const NedarimPayment = ({ amount, firstName, lastName, phone, email }) => {
//   const iframeRef = useRef(null);
//   const MOSAD_ID = "7013230"; // מזהה מוסד (להחליף בערך הנכון)
//   const API_VALID = "XXXXXXX"; // קוד אימות (להשיג מנדרים פלוס)

//   useEffect(() => {
//     const handleMessage = (event) => {
//       if (event.origin !== "https://www.matara.pro") return;
//       console.log("Response from iframe:", event.data);
//     };

//     window.addEventListener("message", handleMessage);

//     return () => {
//       window.removeEventListener("message", handleMessage);
//     };
//   }, []);

//   const sendPaymentData = () => {
//     const paymentData = {
//       Mosad: MOSAD_ID,
//       ApiValid: API_VALID,
//       FirstName: firstName,
//       LastName: lastName,
//       Phone: phone,
//       Mail: email,
//       Amount: amount,
//       PaymentType: "Ragil",
//       Tashlumim: "1",
//       Currency: "1",
//       CallBack: "https://your-server.com/nedarim-callback", // כתובת ה-Callback שלכם
//     };

//     if (iframeRef.current) {
//       iframeRef.current.contentWindow.postMessage(paymentData, "https://www.matara.pro");
//     }
//   };

//   return (
//     <div>
//       <iframe
//         ref={iframeRef}
//         src="https://www.matara.pro/nedarimplus/iframe/"
//         style={{ width: "100%", height: "600px", border: "none" }}
//         title="Nedarim Payment"
//       ></iframe>
//       <button onClick={sendPaymentData}>בצע תשלום</button>
//     </div>
//   );
// };

// export default NedarimPayment;


import { useEffect, useRef } from "react";

interface NedarimPaymentProps {
  amount: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const NedarimPayment: React.FC<NedarimPaymentProps> = ({ amount, firstName, lastName, phone, email }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const MOSAD_ID = "7013230"; // מזהה מוסד
  const API_VALID = "XXXXXXX"; // קוד אימות

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.matara.pro") return;
      console.log("Response from iframe:", event.data);
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handlePayment = () => {
    const paymentData = {
      Mosad: MOSAD_ID,
      ApiValid: API_VALID,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      Mail: email,
      Amount: amount,
      PaymentType: "Ragil",
      Currency: 1,
    };

    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(paymentData, "https://www.matara.pro");
    }
  };

  return (
    <div>
      <iframe
        ref={iframeRef}
        src="https://www.matara.pro/nedarimplus/iframe/"
        width="100%"
        height="500px"
        style={{ border: "none" }}
      ></iframe>
      <button onClick={handlePayment}>בצע תשלום</button>
    </div>
  );
};

export default NedarimPayment;


