
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
import Register from './components/Register/Register';
import Login from './components/Login/Login';

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router>
            <Routes>
              <Route path='/' element={<About />}></Route>
              <Route path="/donation" element={<DonationPage />} />
              <Route path="/donationCart" element={<DonationCart setCartVisible={setCartVisible} />} />
              <Route path="/add-basket" element={<AddBasket />} /> {/* נתיב חדש */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> 
            </Routes>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
