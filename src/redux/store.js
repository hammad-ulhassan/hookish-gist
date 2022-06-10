import { configureStore } from "@reduxjs/toolkit";


import gistReducer from './gistsStore/slice';
import loginReducer from './credentialStore/slice';
import userReducer from './userStore/slice';
import searchReducer from './searchStore/slice';
import { saveState } from "../localStorage";



export const store = configureStore({
  reducer: {
    gists: gistReducer,
    logins: loginReducer,
    users: userReducer,
    searches: searchReducer,
  },


});

store.subscribe(()=>{
  saveState(store.getState());
})