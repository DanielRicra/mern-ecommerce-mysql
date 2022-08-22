/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AuthResponse, User } from '../../types/types';

const emptyUser: User = {
  firstName: '',
  lastName: '',
  email: '',
  userId: 0,
  isAdmin: 0,
};

const getUser = (): User => {
  const rawValue = localStorage.getItem('user');
  if (rawValue) {
    try {
      const saved: AuthResponse = JSON.parse(rawValue);
      return saved.result;
    } catch (error) {
      return emptyUser;
    }
  }
  return emptyUser;
};

const initialState: { user: User } = {
  user: getUser(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = emptyUser;
    },
  },
});

export const { saveUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
