// src/redux/reducers/reducer.js

import { createSlice } from '@reduxjs/toolkit';

const initialGmailState = {
  gmail: '',
};

const initialUsernameState = {
  username: '',
};

// Gmail slice
const gmailSlice = createSlice({
  name: 'storegmail',
  initialState: initialGmailState,
  reducers: {
    storegmail: (state, action) => {
      state.gmail = action.payload;
    },
  },
});

// Username slice
const usernameSlice = createSlice({
  name: 'storeusername',
  initialState: initialUsernameState,
  reducers: {
    storeusername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// ✅ Export actions
export const { storegmail } = gmailSlice.actions;
export const { storeusername } = usernameSlice.actions;

// ✅ Export reducers
export const gmailReducer = gmailSlice.reducer;
export const usernameReducer = usernameSlice.reducer;
