import { createSlice } from "@reduxjs/toolkit";

const cardState = {
  cards: {},
  loading: true,
  error: {
    status: false,
    message: "",
  },
};

const cardSlice = createSlice({
  name: "lists",
  initialState: cardState,
  reducers: {
    error(state, action) {
      state.error = action.payload;
    },
    fetchCards(state, action) {
      console.log(action);
      state.cards[action.payload.idList] = action.payload.data;
      state.loading = false;
      state.error.status = false;
    },
    addCard(state, action) {
      state.cards[action.payload.idList].push(action.payload.data);
      state.error.status = false;
      // state.cards.push(action.payload);
    },
    deleteCard(state, action) {
      state.cards[action.payload.idList] = state.cards[
        action.payload.idList
      ].filter((card) => card.id !== action.payload.idCard);
      state.error.status = false;
    },
  },
});

export const cardActions = cardSlice.actions;

export default cardSlice.reducer;
