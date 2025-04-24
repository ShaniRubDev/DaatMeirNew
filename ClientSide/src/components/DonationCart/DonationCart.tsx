


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { clearCart, removeFromCart } from '../../redux/cartSlice';
import './DonationCart.scss';
import { useNavigate } from 'react-router-dom';

interface DonationCartProps {
    setCartVisible: (visible: boolean) => void;
}

const DonationCart: React.FC<DonationCartProps> = ({ setCartVisible }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state: RootState) => state.cart.cartItems);
    const [showPayment, setShowPayment] = useState(false);

    const baseURL = process.env.REACT_APP_API_BASE_URL;

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleCheckout = () => {
        // כאן אנחנו מבצעים את הניווט לדף התשלום
        // navigate('/payment'); // בוודאות לא הגעת לדף התשלום כי לא השתמשת ב-`navigate` עד כה
        navigate('/payment', { state: { amount: totalAmount } });
        setCartVisible(false); // סגירת הדיאלוג
    };

    const handleRemoveItem = (index: number) => {
        dispatch(removeFromCart(index));
    };

    const totalAmount = cart.reduce((acc, item) => acc + item.sum, 0);

    return (
        <Dialog
            header="העגלה שלי"
            visible={true}
            onHide={() => setCartVisible(false)}
            className="cart-dialog"
            style={{ position: 'absolute', top: '100px', right: '10px' }}
        >
            {cart.length === 0 ? (
                <p>העגלה ריקה. הוסף תרומות כדי לראות אותן כאן.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map((item:any, index:any) => (
                            // <Card key={index} className="cart-item-card">
                            //     <img
                            //         alt={item.title}
                            //         src={`http://localhost:5000${item.image}`}
                            //         className="cart-item-image"
                            //     />
                            //     <div className="cart-item-content">
                            //         <strong>{item.title}</strong>
                            //         <p>סכום כולל: {item.sum} ₪</p>
                            //         <Button
                            //             label="מחיקה"
                            //             icon="pi pi-trash"
                            //             onClick={() => handleRemoveItem(index)}
                            //             className="delete-item-button"
                            //         />
                            //     </div>
                            // </Card>
                            <Card key={index} className="cart-item-card">
                                <img
                                    alt={item.title}
                                    src={`${baseURL}${item.image}`}
                                    className="cart-item-image"
                                />
                                <div className="cart-item-content">
                                    <strong>{item.title}</strong>
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
