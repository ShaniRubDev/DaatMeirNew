// import React, { FC } from 'react';
// import './DeleteBasket.scss';

// interface DeleteBasketProps {}

// const DeleteBasket: FC<DeleteBasketProps> = () => (
//   <div className="DeleteBasket">
//     DeleteBasket Component
//   </div>
// );

// export default DeleteBasket;
import React, { useState, useEffect, useRef } from "react";
import "./DeleteBasket.scss";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import NavBar from "../NavBar/NavBar";
import { getDonationOptions, deleteBasket } from "../../services/basketService";
import { DonationOption } from "../../models/DonationOption";
import * as Icon from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";

const DeleteBasket = () => {
  // const [donationOptions, setDonationOptions] = useState([]);
  const [donationOptions, setDonationOptions] = useState<DonationOption[]>([]);
  const navigate = useNavigate();


  const toast = useRef<Toast>(null);


  useEffect(() => {
    const fetchDonationOptions = async () => {
      try {
        const options = await getDonationOptions();
        setDonationOptions(options.basket || []);
      } catch (error) {
        console.error("Error fetching donation options:", error);
      }
    };

    fetchDonationOptions();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      console.log(`the selected basket ${id}`)
      await deleteBasket(id);
      setDonationOptions((prev) => prev.filter((item) => item.id !== id));
      toast.current?.show({
        severity: "success",
        summary: "נמחק בהצלחה",
        detail: "הסל נמחק מהרשימה",
        life: 3000,
      });
    } catch (error) {
      console.error("Error deleting basket:", error);
      // toast.current?.show({
      //   severity: "error",
      //   summary: "שגיאה",
      //   detail: "לא ניתן למחוק את הסל",
      //   life: 3000,
      // });
    }
  };

  return (
    <div className="DeleteBasket">
      <div className="donation-page">
        <h1 className="title">ניהול סלי צדקה</h1>
        <Toast ref={toast} position="top-right" />
        <div className="donation-grid">
          {donationOptions.map((option) => (
            <Card
              key={option.id}
              title={option.title}
              subTitle={`${option.sum} ₪`}
              header={<img alt={option.title} src={`https://daatmeirnew.onrender.com${option.image}`} className="donation-image" />}
              className="donation-card"
            >
              <p className="donation-description">{option.description}</p>
              <Button
                icon="pi pi-trash"
                className="p-button-danger"
                onClick={() => handleDelete(option.id)}
                label="מחיקה"
              />
            </Card>
          ))}
        </div>

      </div>
      {/* <Icon. size={50} color='black' className='m-t5'></Icon.Cart3> */}
      <button className="add-basket-btn" onClick={() => navigate("/add-basket")}>
    <i className="bi bi-plus-lg"></i>
  </button>
    </div>
  );
};

export default DeleteBasket;
