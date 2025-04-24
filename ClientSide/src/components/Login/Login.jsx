import React, { useState } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useRef(null);
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_BASE_URL;


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${baseURL}/login`, {
                email,
                password,
            });

            toast.current.show({
                severity: "success",
                summary: "התחברות מוצלחת",
                detail: response.data.message,
                life: 3000,
            });

            navigate("/manage-area");
        } catch (error) {
            toast.current.show({
                severity: "error",
                summary: "שגיאה",
                detail: error.response?.data?.message || "שגיאה כללית",
                life: 3000,
            });
        }
    };

    return (
        <div className="login-container">
            <Toast ref={toast} />
            <Card title="כניסה כמנהל" className="login-card">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="p-field">
                        <label htmlFor="email">אימייל</label>
                        <InputText
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-inputtext-sm"
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="password">סיסמה</label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            feedback={false}
                            className="p-password-sm"
                        />
                    </div>

                    {/* <Button type="submit" label="כניסה" icon="pi pi-sign-in" className="p-button-primary" /> */}
                    <Button
                        type="submit"
                        label="כניסה"
                        icon="pi pi-sign-in"
                        className="cta-button"
                        style={{ width: "100%" }} // התאמה למבנה הכרטיס
                    />
                </form>
            </Card>
        </div>
    );
};

// vvvv
export default Login;
