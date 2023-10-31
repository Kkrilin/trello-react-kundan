import { configureStore } from "@reduxjs/toolkit";

import checkList from "./checListSlice";
import board from "./boardSlice";
import list from "./listSlice";

const store = configureStore({
  reducer: { checkList, board, list },
});

export default store;
