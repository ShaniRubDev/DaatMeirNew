
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer, // מכניסים את ה-reducer של העגלה ל-store
//   },
// });

// export type RootState = ReturnType<typeof store.getState>; // סוג עבור ה-state של ה-store
// export type AppDispatch = typeof store.dispatch; // סוג עבור ה-dispatch

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // שימוש ב-localStorage

// שילוב כל ה-reducers במערכת (אם בעתיד יהיו עוד)
const rootReducer = combineReducers({
  cart: cartReducer, 
});

// הגדרות persist
const persistConfig = {
  key: 'root', // מפתח אחסון
  storage,     // שמירה ב-localStorage
  whitelist: ['cart'], // רשימת reducers שיישמרו
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // משתמש בגרסה הפרסיסטנטית של ה-rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // מניעת אזהרות מ-redux-persist
    }),
});

export const persistor = persistStore(store); // יצירת אובייקט לשחזור הנתונים

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
