import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../src/redux/store'; 

import './App.scss';

import About from './components/About/About';
import DonationPage from './components/DonationPage/DonationPage';
import DonationCart from './components/DonationCart/DonationCart';
import AddBasket from './components/AddBasket/AddBasket';
import DeleteBasket from './components/DeleteBasket/DeleteBasket';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import ManageArea from './components/ManageArea/ManageArea';
import AddAnnouncement from './components/AddAnnouncement/AddAnnouncement';
import ThankYou from './components/ThankYou/ThankYou';
import PersonalDetailsForm from './components/PersonalDetailsForm/PersonalDetailsForm';
import DonationsList from './components/DonationsList/DonationsList';
import DonorsList from "./components/DonorsList/DonorsList"
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ManageAnnouncements from './components/ManageAnnouncements/ManageAnnouncements';

function App() {
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div className="App" dir="rtl" lang="he">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path='/About' element={<About />} />
                <Route path='/' element={<Home />} />
                <Route path="/donation" element={<DonationPage />} />
                <Route path="/donationCart" element={<DonationCart setCartVisible={setCartVisible} />} />
                <Route path="/add-basket" element={<AddBasket />} />
                <Route path="/manage-basket" element={<DeleteBasket />} />
                <Route path="/manage-area" element={<ManageArea />} />
                <Route path="/add-masage" element={<AddAnnouncement />} />
                <Route path="/thenks" element={<ThankYou />} />
                <Route path="/payment" element={<PersonalDetailsForm />} />
                <Route path="/DonationsList" element={<DonationsList />} />
                <Route path="/DonorsList" element={<DonorsList />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/manageAn" element={<ManageAnnouncements />} />
              </Route>
            </Routes>
          </div>
        </PersistGate>
      </Provider>
    </HashRouter>
  );
}

export default App;
