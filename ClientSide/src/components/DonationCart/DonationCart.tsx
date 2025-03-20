
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { clearCart, removeFromCart } from '../../redux/cartSlice';
import './DonationCart.scss';

interface DonationCartProps {
  setCartVisible: (visible: boolean) => void;
}

const DonationCart: React.FC<DonationCartProps> = ({ setCartVisible }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cartItems);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    alert("מעבר לעמוד תשלום...");
    setCartVisible(false); // סגירת העגלה
  };

  const handleRemoveItem = (index: number) => {
    dispatch(removeFromCart(index));
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.sum, 0);

  return (
    <Dialog
      header="העגלה שלי"
      visible={true}
      onHide={() => setCartVisible(false)} // סגירת העגלה
      className="cart-dialog"
      style={{ position: 'absolute', top: '100px', right: '10px' }} // מיקום מתחת לאייקון
    >
      {cart.length === 0 ? (
        <p>העגלה ריקה. הוסף תרומות כדי לראות אותן כאן.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <Card key={index} className="cart-item-card">
                <div className="cart-item-content">
                  <strong>{item.title}</strong>
                  {/* <p>כמות: {item.amount} ₪</p> */}
                  <p>סכום כולל: {item.sum} ₪</p>
                  <Button 
                    label="מחיקה" 
                    icon="pi pi-trash" 
                    onClick={() => handleRemoveItem(index)} 
                    className="delete-item-button"
                  />
                </div>
              </Card>
            ))}
          </div>
          <h3>סה"כ: {totalAmount} ₪</h3>
          <div className="cart-actions">
            <Button label="נקה סל" onClick={handleClearCart} className="clear-cart-button" />
            <Button label="לתשלום" onClick={handleCheckout} className="checkout-button" />
          </div>
        </>
      )}
    </Dialog>
  );
};

export default DonationCart;
