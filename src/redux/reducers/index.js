import { combineReducers } from '@reduxjs/toolkit';
import { gmailReducer, usernameReducer } from './reducer'; // ✅ import actual reducers

const rootReducer = combineReducers({
  storegmail: gmailReducer,     // ✅ correct usage
  storeusername: usernameReducer,
});

export default rootReducer;
