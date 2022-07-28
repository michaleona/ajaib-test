import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";


// Type for our state
export interface UserState {
  gender: string;
  search: string | null;
  isLoading: boolean;
}

// Initial state
const initialState: UserState = {
  gender: "all",
  search: null,
  isLoading: true,
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setGender(state, action) {
      state.gender = action.payload;
    },

    setLoader(state, action) {
      state.isLoading = action.payload;
    },

    setSearch(state, action) {
      state.search = action.payload;
    },

  },
});

export const { setGender, setLoader, setSearch } = userSlice.actions;

export const selectGenderState = (state: AppState) => state.user.gender;
export const selectSearchState = (state: AppState) => state.user.search;

export default userSlice.reducer;