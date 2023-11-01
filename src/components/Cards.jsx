import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateCard from "./CreateCard";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../store/cardSlice";
import { listActions } from "../store/listSlice";
import Card from "./Card";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;
const Cards = ({ idList, list, dispatch }) => {
  // const dispatch = useDispatch();
  const [cards, setCards] = useState([]);
  // const { cards, loading } = useSelector((state) => state.card);
  // console.log(cards,loading)
  useEffect(() => {
    // dispatch(cardActions.fetchCardRequested());
    axios
      .get(
        `https://api.trello.com/1/lists/${idList}/cards?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        setCards(response.data);
        // dispatch(cardActions.fetchCards({ data: response.data, idList }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          listActions.fetchDataFailed({
            message: error.message,
            response: error.reponse.data,
            status: true,
          })
        );
      });
  }, []);
  return (
    <>
      {cards.map((card) => (
        <Card
          list={list}
          id={card.id}
          key={card.id}
          card={card}
          setCards={setCards}
        />
      ))}
      <CreateCard setCards={setCards} idList={idList} />
    </>
  );
};

export default Cards;
