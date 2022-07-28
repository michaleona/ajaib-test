import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";


// Type for our state
export interface UserState {
  gender: string;
  search: string;
  isLoading: boolean;
  users: any;
}

// Initial state
const initialState: UserState = {
  gender: "all",
  search: "",
  isLoading: true,
  users: null
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
    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },

  },
});

export const { setGender, setLoader, setSearch } = userSlice.actions;

export const selectGenderState = (state: AppState) => state.user.gender;
export const selectSearchState = (state: AppState) => state.user.search;

export default userSlice.reducer;