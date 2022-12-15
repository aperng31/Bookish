import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //some sort of 'user logged in' state
  user_id: undefined,
  name: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // console.log(action.payload)
      state.user_id = action.payload.user_id; //'modify' state to add
      state.name = action.payload.name;
      state.username = action.payload.username;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
