// import React, { FC } from 'react';
// import './DonationPage.scss';
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";
// import { DonationOption } from '../../models/DonationOption';
// import { addToCart, clearCart } from '../../redux/features/cartSlice'
// import { useDispatch } from 'react-redux';

// const donationOptions: DonationOption[] = [
//   {
//     title: "אחזקת אברך",
//     amount: "1,200 ₪ לחודש",
//     description:
//       "הזכות הגדולה לתמוך בתלמיד חכם העוסק בתורה, כך שיוכל להקדיש את ימיו ללימוד.",
//     image: "images/tora.jpg",
//   },
//   {
//     title: "סל שבת",
//     amount: "400 ₪",
//     description:
//       "מספק למשפחה את צרכי השבת, כולל חלות, יין, עופות, דגים ושאר מצרכים חיוניים.",
//     image: "images/shabat.jpg",
//   },
//   {
//     title: "סל חג פורים",
//     amount: "500 ₪",
//     description:
//       "כולל משלוחי מנות, מתנות לאביונים וסיוע לחג, כדי שכל יהודי יוכל לשמוח כראוי.",
//     image: "images/purim.jpg",
//   },
//   {
//     title: "סל חג פסח",
//     amount: "1,000 ₪",
//     description:
//       "מסייע למשפחה בהוצאות החג עם מצות, יין, בשר, דגים וצורכי ליל הסדר.",
//     image: "images/passover.jpeg",
//   },
//   {
//     title: "תומך חודשי קבוע",
//     amount: "תרומה חופשית",
//     description: "אפשרות לסיוע רציף למשפחות קשות יום ולהבטיח אור ושפע לביתם.",
//     image: "images/tzdaka.jpg",
//   },
// ];
// const dispatch = useDispatch();

// const handleAddToCart = (donation: DonationOption) => {
//   dispatch(addToCart(donation)); // הוספת תרומה לעגלה
// };


// interface DonationPageProps { }

// const DonationPage: FC<DonationPageProps> = () => {
//   return <div className="DonationPage">
//     <div className="donation-page">
//       <h1 className="title">סלי צדקה - ברכה עבורכם</h1>
//       <div className="donation-grid">
//         {donationOptions.map((option, index) => (
//           <Card
//             key={index}
//             title={option.title}
//             subTitle={option.amount}
//             header={<img alt={option.title} src={option.image} className="donation-image" />}
//             className="donation-card"
//           >
//             <p className="donation-description">{option.description}</p>
//             <Button  label="אני רוצה לתרום"  onClick={() => handleAddToCart(option)} className="donate-button" />
//           </Card>
//         ))}
//       </div>
//     </div>
//   </div>
// }

// export default DonationPage;
import React, { FC, useState } from "react";
import "./DonationPage.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { DonationOption } from "../../models/DonationOption";
import { addToCart, clearCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"; 
import { Link } from 'react-router-dom'; // ייבוא של Link


const donationOptions: DonationOption[] = [
  {
    title: "אחזקת אברך",
    amount: "1,200 ₪ לחודש",
    sum: 1200,
    description:
      "הזכות הגדולה לתמוך בתלמיד חכם העוסק בתורה, כך שיוכל להקדיש את ימיו ללימוד.",
    image: "images/tora.jpg",
    freeAmount: false

  },
  {
    title: "סל שבת",
    amount: "400 ₪",
    sum: 400,
    description:
      "מספק למשפחה את צרכי השבת, כולל חלות, יין, עופות, דגים ושאר מצרכים חיוניים.",
    image: "images/shabat.jpg",
    freeAmount: false

  },
  {
    title: "סל חג פורים",
    amount: "500 ₪",
    sum: 500,
    description:
      "כולל משלוחי מנות, מתנות לאביונים וסיוע לחג, כדי שכל יהודי יוכל לשמוח כראוי.",
    image: "images/purim.jpg",
    freeAmount: false

  },
  {
    title: "סל חג פסח",
    amount: "1,000 ₪",
    sum: 1000,
    description:
      "מסייע למשפחה בהוצאות החג עם מצות, יין, בשר, דגים וצורכי ליל הסדר.",
    image: "images/passover.jpeg",
    freeAmount: false
  },
  {
    title: "תומך חודשי קבוע",
    amount: "תרומה חופשית",
    sum: 0,
    description: "אפשרות לסיוע רציף למשפחות קשות יום ולהבטיח אור ושפע לביתם.",
    image: "images/tzdaka.jpg",
    freeAmount: true
  },
];

interface DonationPageProps { }

const DonationPage: FC<DonationPageProps> = () => {
  const dispatch = useDispatch(); // יש לקרוא ל-useDispatch בתוך הרכיב
  const [customAmount, setCustomAmount] = useState(0); // state שומר את הסכום שהמשתמש בחר
  const [customAmounts, setCustomAmounts] = useState<{ [key: number]: number }>({});
  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>({});
  const toast = useRef<Toast>(null);



  const handleAmountChange = (index: number, value: number) => {
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
    const amountToDonate = donation.freeAmount ? customAmounts[index] || 0 : donation.sum;
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
      <NavBar></NavBar>
      <div className="donation-page">
        <h1 className="title">סלי צדקה - ברכה עבורכם</h1>
        <Link to="/add-basket">
        <i className="bi bi-basket-plus" style={{ fontSize: "30px", color: "blue", cursor: "pointer" }}></i>
      </Link>

        <div className="donation-grid">
          <Toast ref={toast} position="top-right" />

          {donationOptions.map((option, index) => (
            <Card
              key={index}
              title={option.title}
              subTitle={option.amount}
              header={
                <img alt={option.title} src={option.image} className="donation-image" />
              }
              className="donation-card"
            >
              <p className="donation-description">{option.description}</p>
              {option.freeAmount ? (
                <div className="flex-auto">
                  <label htmlFor={`customAmount-${index}`} className="font-bold block mb-2">
                    בחר סכום חודשי:
                  </label>
                  <InputNumber
                    inputId={`customAmount-${index}`}
                    value={customAmount}
                    useGrouping={false}
                    onValueChange={(e) => handleAmountChange(index, e.value ?? 0)}
                    placeholder="סכום חודשי"
                    className="w-full mt-2"
                  />
                </div>
              ) : null}
              <Button
                label="אני רוצה לתרום"
                onClick={() => handleAddToCart(option, index)}
                className="donate-button"
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
