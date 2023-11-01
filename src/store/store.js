import { configureStore } from "@reduxjs/toolkit";

import checkList from "./checListSlice";
import board from "./boardSlice";
import list from "./listSlice";
import card from "./cardSlice";

const store = configureStore({
  reducer: { checkList, board, list, card },
});

export default store;
