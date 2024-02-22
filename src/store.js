import { configureStore } from '@reduxjs/toolkit';
import { combineReducers,applyMiddleware } from 'redux'; 
import {thunk} from 'redux-thunk';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducer';
const reducer = combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer
});



const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem("userInfo")):null;
const initialState = {
  userLogin:{userInfo:userInfoFromStorage},
};
const middleware = [thunk]; // Define your middleware array

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
