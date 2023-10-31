export const initialState = {
  checkLists: [],
  loading: true,
  error: {
    message: "",
    response: "",
    status: false,
  },
};

const checkListReducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        checkLists: [],
        loading: false,
        error: action.payload,
      };
    case "FETCH_CHECKLISTS":
      return {
        checkLists: action.payload,
        loading: false,
        error: {
          ...state.error,
        },
      };
    case "ADD_CHECKLIST":
      const newCheckList = [...state.checkLists, action.payload];
      return {
        checkLists: newCheckList,
        loading: false,
        error: {
          ...state.error,
        },
      };
    case "DELETE_CHECKLIST":
      return {
        checkLists: action.payload,
        loading: false,
        error: {
          ...state.error,
        },
      };
    case "ADD_CHECKITEM":
      const newCheckLists = state.checkLists.map((checklist) => {
        if (checklist.id === action.payload.idChecklist) {
          return {
            ...checklist,
            checkItems: [...checklist.checkItems, action.payload],
          };
        } else {
          return checklist;
        }
      });
      return {
        checkLists: newCheckLists,
        loading: false,
        error: {
          ...state.error,
        },
      };
    case "CHECK_CHECKITEM":
      const newCheckLists1 = state.checkLists.map((checklist) => {
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
      return {
        checkLists: newCheckLists1,
        loading: false,
        error: {
          ...state.error,
        },
      };
    case "DELETE_ITEM":
      const newCheckLists2 = state.checkLists.map((checklist) => {
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
      return {
        checkLists: newCheckLists2,
        loading: false,
        error: {
          ...state.error,
        },
      };
    default:
      return state;
  }
};

export default checkListReducer;
