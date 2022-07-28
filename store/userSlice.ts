import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
interface DataType {
  login: string;
  name: string;
  email: string;
  registered: string;
}

// Type for our state
export interface UserState {
  gender: string;
  search: string | null;
  isLoading: boolean;
  sorter: Record<string, string>;
  pagination: Record<string, string | number | boolean>;
}

// Initial state
const initialState: UserState = {
  gender: "all",
  search: null,
  isLoading: true,
  sorter: {
    field: null,
    order: null
  },
  pagination: {
    current: 1,
    total: 100,
    pageSize: 10,
    showSizeChanger: false,
  }
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

    setSorter(state, action) {
      state.sorter = action.payload;
    },

    setPagination(state, action) {
      state.pagination = action.payload;
    },

  },
});

export const { setGender, setLoader, setSearch, setSorter, setPagination } = userSlice.actions;

export const selectGenderState = (state: AppState) => state.user.gender;
export const selectSearchState = (state: AppState) => state.user.search;
export const selectSorterState = (state: AppState) => state.user.sorter;
export const selectPaginationState = (state: AppState) => state.user.pagination;

export default userSlice.reducer;