import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import './Register.scss';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/register', { email, password });
      toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message });
      navigate("/manage-area");
    } 
    catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred while submitting the form";
      toast.current.show({ severity: 'error', summary: 'Error', detail: errorMessage });
    }
  };

  return (
    <div className="register-container">
      <Toast ref={toast} />
      <Card title="הרשם כמנהל" className="register-card">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="p-field">
            <label htmlFor="email">אימייל</label>
            <InputText
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-inputtext-lg"
            />
          </div>
          <div className="p-field">
            <label htmlFor="password">סיסמה</label>
            <Password
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              className="p-inputtext-lg"
            />
          </div>
          <Button label="הירשם" icon="pi pi-user-plus" className="p-button-lg p-button-primary" type="submit" />
        </form>
      </Card>
    </div>
  );
};

export default Register;
