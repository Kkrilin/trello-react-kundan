import { createSlice, configureStore } from "@reduxjs/toolkit";

const checklistsState = {
  checkLists: [],
};

const checklistSlice = createSlice({
  name: "checklists",
  initialState: checklistsState,
  reducers: {
    fetchData(state, action) {
      state.checkLists = action.payload;
    },
    addCheckList(state, action) {
      state.checkLists = [...state.checkLists, action.payload];
    },
    deleteCheckList(state, action) {
      state.checkLists = action.payload;
    },
    checkCheckItem(state, action) {
      state.checkLists = state.checkLists.map((checklist) => {
        if (checklist.id === action.payload.idChecklist) {
          return {
            ...checklist,
            checkItems: checklist.checkItems.map((checkitem) =>
              checkitem.id === action.payload.id ? action.payload : checkitem
            ),
          };
        } else {
          return checklist;
        }
      });
    },
    addCheckItem(state, action) {
      state.checkLists = state.checkLists.map((checklist) => {
        if (checklist.id === action.payload.idChecklist) {
          return {
            ...checklist,
            checkItems: [...checklist.checkItems, action.payload],
          };
        } else {
          return checklist;
        }
      });
    },
    deleteCheckItem(state, action) {
      state.checkLists = state.checkLists.map((checklist) => {
        if (checklist.id === action.payload.idChecklist) {
          return {
            ...checklist,
            checkItems: checklist.checkItems.filter(
              (checkitem) => checkitem.id !== action.payload.id
            ),
          };
        } else {
          return checklist;
        }
      });
    },
  },
});

export const checklistsActions = checklistSlice.actions;

const store = configureStore({
  reducer: { checkList: checklistSlice.reducer },
});

export default store;
