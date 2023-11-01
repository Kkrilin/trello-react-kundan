import { createSlice } from "@reduxjs/toolkit";

const cardState = {
  cards: {},
  loading: true,
};

const cardSlice = createSlice({
  name: "lists",
  initialState: cardState,
  reducers: {
    fetchCardRequested(state, action) {
      state.loading = true;
    },
    fetchCards(state, action) {
      console.log(action);
      state.cards[action.payload.idList] = action.payload.data;
      state.loading = false;
    },
    addCard(state, action) {
      state.cards.push(action.payload);
    },
    deleteCard(state, action) {
      state.cards = state.cards.filter((card) => card.id !== action.payload.id);
    },
  },
});

export const cardActions = cardSlice.actions;

export default cardSlice.reducer;
