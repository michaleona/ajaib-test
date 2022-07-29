import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";

// Type for our state
export interface UserState {
  filters: Record<string, any>;
  isLoading: boolean;
  sorter: Record<string, string>;
  pagination: Record<string, string | number | boolean>;
  isResetFilter: boolean;
}

// Initial state
const initialState: UserState = {
  filters: {
    gender: "all",
    search: null
  },
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
  },
  isResetFilter: false
};

// Actual Slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    setFilters(state, action) {
      state.filters = action.payload;
    },

    setLoader(state, action) {
      state.isLoading = action.payload;
    },

    setSorter(state, action) {
      state.sorter = action.payload;
    },

    setPagination(state, action) {
      state.pagination = action.payload;
    },
    setResetFilter(state) {
      state.isResetFilter = true;
      state.filters = {
        gender: "all",
        search: null
      };
      state.pagination = { ...state.pagination, current: 1 };
      state.sorter = { field: null, order: null };
    },
    setIsResetFilter(state, action) {
      state.isResetFilter = action.payload;
    }

  },
});

export const { setFilters, setLoader, setSorter, setPagination, setResetFilter, setIsResetFilter } = userSlice.actions;

export const selectFiltersState = (state: AppState) => state.user.filters;
export const selectSorterState = (state: AppState) => state.user.sorter;
export const selectPaginationState = (state: AppState) => state.user.pagination;
export const selectResetFilterState = (state: AppState) => state.user.isResetFilter;

export default userSlice.reducer;