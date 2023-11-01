import { createSlice } from "@reduxjs/toolkit";

const listState = {
  lists: [],
  loading: true,
  error: {
    status: true,
  },
};

const listSlice = createSlice({
  name: "lists",
  initialState: listState,
  reducers: {
    fetchDataRequested(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.lists = action.payload;
      state.loading = false;
      state.error = {
        status: false,
      };
    },
    fetchDataFailed(state, action) {
      state.lists = [];
      state.loading = false;
      state.error = action.payload;
    },
    addList(state, action) {
      state.lists.push(action.payload);
      state.loading = false;
    },
    deleteList(state, action) {
      state.lists = state.lists.filter((list) => list.id !== action.payload.id);
      state.loading = false;
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice.reducer;
