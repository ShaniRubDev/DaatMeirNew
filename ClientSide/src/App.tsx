
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Change import to use BrowserRouter
// import Login from './components/Login/Login';
// import Signup from './components/Signup/Signup';
import { configureStore } from '@reduxjs/toolkit';
// import userSlice from './redux/features/userSlice';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { PersistGate } from 'redux-persist/integration/react';
import About from './components/About/About';
import DonationPage from './components/DonationPage/DonationPage';
import DonationCart from './components/DonationCart/DonationCart';
import { store, persistor } from '../src/redux/store'; // ייבוא נכון של ה-store וה-persistor
import AddBasket from './components/AddBasket/AddBasket'; // ייבוא הקומפוננטה החדשה
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
// import PersonalDetailsForm from './components/PersonalDetailsForm/PersonalDetailsForm';




// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, userReducer);

// const store = configureStore({
//   reducer: {
//     user: persistedReducer,
//   },
// });

// const persistor = persistStore(store);

function App() {
  const [cartVisible, setCartVisible] = useState(false);

  return (
        <HashRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App" dir="rtl" lang="he">
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path='/About' element={<About />}></Route>
                <Route path='/' element={<Home/>}></Route>
                <Route path="/donation" element={<DonationPage />} />
                <Route path="/donationCart" element={<DonationCart setCartVisible={setCartVisible} />} />
                <Route path="/add-basket" element={<AddBasket />} /> {/* נתיב חדש */}
                <Route path="/manage-basket" element={<DeleteBasket />} /> {/* נתיב חדש */}
                <Route path="/manage-area" element={<ManageArea />} />
                <Route path="/add-masage" element={<AddAnnouncement/>} />
                <Route path = "/thenks" element={<ThankYou/>}></Route>
                <Route path="/payment" element={<PersonalDetailsForm  />} />
                <Route path="/DonationsList" element={<DonationsList/>} />
                <Route path="/DonorsList" element={<DonorsList/>} />
                <Route path="/Login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/manageAn" element={<ManageAnnouncements/>} />



              </Route>
            </Routes>
          </Router>
        </div>
      </PersistGate>
    </Provider>
        </HashRouter>

  );
}

export default App;
