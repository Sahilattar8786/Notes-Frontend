import { configureStore } from '@reduxjs/toolkit';
import { combineReducers,applyMiddleware } from 'redux'; 
import {thunk} from 'redux-thunk';
import { userLoginReducer, userRegisterReducer,userUpdateReducer } from './reducers/userReducer';
import { notesCreateReducer, notesDeleteReducer, notesListReducer, notesUpdateReducer, } from './reducers/notesReducer';

const reducer = combineReducers({
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    noteList:notesListReducer,
    noteCreate:notesCreateReducer,
    noteUpdate:notesUpdateReducer,
    noteDelete:notesDeleteReducer,
    userUpdate: userUpdateReducer,

});



const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem("userInfo")):null;
const initialState = {
  userLogin:{userInfo:userInfoFromStorage},
};
const middleware = [thunk]; // Define your middleware array

const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
