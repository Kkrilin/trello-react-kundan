import { createSlice, configureStore } from "@reduxjs/toolkit";

const checklistsState = {
  checkLists: [],
  loading: true,
  error: {
    message: "",
    response: "",
    status: false,
  },
};
const checklistSlice = createSlice({
  name: "checklists",
  initialState: checklistsState,
  reducers: {
    fetchError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchData(state, action) {
      state.checkLists = action.payload;
      state.loading =false
    },
    addCheckList(state, action) {
      // state.checkLists = [...state.checkLists, action.payload];
      state.checkLists.push(action.payload);
    },
    deleteCheckList(state, action) {
      state.checkLists = action.payload;
    },
    checkCheckItem(state, action) {
      state.checkLists.forEach((checklist) => {
        if (checklist.id === action.payload.idChecklist) {
          checklist.checkItems.forEach((checkitem, i, arr) => {
            if (checkitem.id === action.payload.id) {
              arr[i] = action.payload;
            }
          });
        }
      });
    },
    addCheckItem(state, action) {
      state.checkLists.forEach((checklist) => {
        if (checklist.id === action.payload.idChecklist) {
          // checklist.checkItems=[...checklist.checkItems, action.payload],
          checklist.checkItems.push(action.payload);
        }
      });
    },
    deleteCheckItem(state, action) {
      state.checkLists.forEach((checklist) => {
        if (checklist.id === action.payload.idChecklist) {
          checklist.checkItems = checklist.checkItems.filter(
            (checkitem) => checkitem.id !== action.payload.id
          );
        }
      });
    },
  },
});

export const checklistsActions = checklistSlice.actions;

export default checklistSlice.reducer;
