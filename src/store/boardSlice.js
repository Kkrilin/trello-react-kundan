import { createSlice } from "@reduxjs/toolkit";

const boardState = {
  boards: [],
  loading: false,
  error: {
    status: true,
  },
};

const boardSlice = createSlice({
  name: "boards",
  initialState: boardState,
  reducers: {
    fetchDataRequested(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.boards = action.payload;
      state.loading = false;
      state.error = {
        status: false,
      };
    },
    fetchDataFailed(state, action) {
      state.boards = [];
      state.loading = false;
      state.error = action.payload;
    },
    addBoard(state, action) {
      state.boards.push(action.payload);
      state.loading = false;
    },
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
