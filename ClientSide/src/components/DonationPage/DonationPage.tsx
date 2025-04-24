
// import React, { FC, useState } from "react";
import "./DonationPage.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DonationOption } from "../../models/DonationOption";
import { addToCart, clearCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from 'react-router-dom'; // ייבוא של Link
import { getDonationOptions } from '../../services/basketService'
import React, { FC, useState, useEffect, useRef } from "react";

// const donationOptions: DonationOption[] = [

//   {
//     title: "אחזקת אברך",
//     amount: "1,200 ₪ לחודש",
//     sum: 1200,
//     description:
//       "הזכות הגדולה לתמוך בתלמיד חכם העוסק בתורה, כך שיוכל להקדיש את ימיו ללימוד.",
//     image: "images/tora.jpg",
//     freeAmount: false

//   },
//   {
//     title: "סל שבת",
//     amount: "400 ₪",
//     sum: 400,
//     description:
//       "מספק למשפחה את צרכי השבת, כולל חלות, יין, עופות, דגים ושאר מצרכים חיוניים.",
//     image: "images/shabat.jpg",
//     freeAmount: false

//   },
//   {
//     title: "סל חג פורים",
//     amount: "500 ₪",
//     sum: 500,
//     description:
//       "כולל משלוחי מנות, מתנות לאביונים וסיוע לחג, כדי שכל יהודי יוכל לשמוח כראוי.",
//     image: "images/purim.jpg",
//     freeAmount: false

//   },
//   {
//     title: "סל חג פסח",
//     amount: "1,000 ₪",
//     sum: 1000,
//     description:
//       "מסייע למשפחה בהוצאות החג עם מצות, יין, בשר, דגים וצורכי ליל הסדר.",
//     image: "images/passover.jpeg",
//     freeAmount: false
//   },
//   {
//     title: "תומך חודשי קבוע",
//     amount: "תרומה חופשית",
//     sum: 0,
//     description: "אפשרות לסיוע רציף למשפחות קשות יום ולהבטיח אור ושפע לביתם.",
//     image: "images/tzdaka.jpg",
//     freeAmount: true
//   },
// ];

interface DonationPageProps { }

const DonationPage: FC<DonationPageProps> = () => {
  const dispatch = useDispatch(); // יש לקרוא ל-useDispatch בתוך הרכיב
  const [donationOptions, setDonationOptions] = useState<DonationOption[]>([]); // לא מאתחלים את המערך מראש
  const [customAmount, setCustomAmount] = useState(0); // state שומר את הסכום שהמשתמש בחר
  const [customAmounts, setCustomAmounts] = useState<{ [key: number]: number }>({});
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});
  const toast = useRef<Toast>(null);
  const baseURL = process.env.REACT_APP_API_BASE_URL;

  // useEffect(() => {
  //   // שימוש בשירות כדי להביא את התרומות
  //   const fetchDonationOptions = async () => {
  //     try {
  //       const options = await getDonationOptions(); // קריאה לשירות
  //       console.log("Fetched donation options:", options.basket); // בדיקה
  //       if (Array.isArray(options.basket)) {
  //         console.log("it is arry!")
  //         console.log(`the options set to`+options.basket)
  //         setDonationOptions(options.basket);
  //       } else {
  //         console.error("Error: API response is not an array", options);
  //         setDonationOptions([]); // הגנה מפני קריסה
  //       }
  //       setDonationOptions(options.baskets); // שמירת התרומות בסטייט
  //     } catch (error) {
  //       console.error("Error fetching donation options:", error);
        
  //     }
  //   };

  //   fetchDonationOptions();
  // }, []);

  useEffect(() => {
    const fetchDonationOptions = async () => {
      try {
        const options = await getDonationOptions(); // קריאה לשירות
        console.log("Fetched donation options:", JSON.stringify(options.basket, null, 2)); // הדפסה של התשובה בפורמט קריא
        if (Array.isArray(options.basket)) {
          console.log("it is array!")
          setDonationOptions(options.basket); // שמירה בסטייט
        } else {
          console.error("Error: API response is not an array", options);
          setDonationOptions([]); // הגנה מפני קריסה
        }
      } catch (error) {
        console.error("Error fetching donation options:", error);
      }
    };
  
    fetchDonationOptions();
  }, []);

  const handleAmountChange = (index: number, value: number) => {
  console.log(`Index: ${index}, New Value: ${value}`);

  setCustomAmounts(prev => ({
    ...prev,
    [index]: value
  }));
  };

  // const handleAddToCart = (donation: DonationOption, index: number) => {
  //   const amountToDonate = donation.freeAmount ? (customAmounts[index] || 0) : donation.sum;
  //   dispatch(addToCart({ ...donation, sum: amountToDonate }));
  // };

  const handleAddToCart = (donation: DonationOption, index: number) => {
    // const amountToDonate = donation.freeAmount ? customAmounts[index] || 0 : donation.sum;
    // const amountToDonate = donation.freeAmount ? (customAmounts[index] || 0) : donation.sum;
    // console.log(`amountToDonate` + amountToDonate)
    // dispatch(addToCart({ ...donation, sum: amountToDonate }));
    const amountToDonate = donation.sum === 0 ? customAmounts[index] : donation.sum;

    console.log(`customAmounts[${index}]:`, customAmounts[index]); // לוודא שהערך נכנס כראוי
    console.log(`amountToDonate:`, amountToDonate); // להדפיס את הסכום הסופי
    
    dispatch(addToCart({ ...donation, sum: amountToDonate }));
    
    // הוסף את התרומה עם הסכום המעודכן
    dispatch(addToCart({ ...donation, sum: amountToDonate }));

    // הצגת הודעת הצלחה
    toast.current?.show({
      severity: "info",
      summary: "תרומה נוספה בהצלחה",
      className: "custom-toast-secondary",
      life: 3000,
    });
  };





  return (
    <div className="DonationPage">
      <div className="donation-page">
        {/* <h1 className="title">סלי צדקה - ברכה עבורכם</h1> */}
        <Link to="/add-basket">
          <i className="bi bi-basket-plus" style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}></i>
        </Link>

        <div className="donation-grid">
          <Toast ref={toast} position="top-right" />

          {donationOptions?.map((option, index) => (
        
            <Card
              key={index}
              title={option.title}
              subTitle={option.sum ==0 ?null:`${option.sum} ₪`}
              header={
                <img alt={option.title} src={`${baseURL}${option.image}`} className="donation-image" />
              }
              className="donation-card"
            >
              <p className="donation-description">{option.description}</p>
              {option.sum ==0 ? (
                <div className="flex-auto">
                  <label htmlFor={`customAmount-${index}`} className="font-bold block mb-7">
                    בחר סכום חודשי:
                  </label>
                  <InputNumber
                    inputId={`customAmount-${index}`}
                    // value={customAmount}
                    value={customAmounts[index] || 0} 
                    useGrouping={false}
                    onValueChange={(e) => handleAmountChange(index, e.value ?? 0)}
                    placeholder="סכום חודשי"
                    className="w-full mt-6"
                  />
                </div>
              ) : null}
              <Button
                label="אני רוצה לתרום"
                onClick={() => handleAddToCart(option, index)}
                className="donate-button m-2"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
