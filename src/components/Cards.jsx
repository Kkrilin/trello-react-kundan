import axios from "axios";
import React, { useEffect} from "react";
import CreateCard from "./CreateCard";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../store/cardSlice";
import Card from "./Card";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;
const Cards = ({ idList, list }) => {
  const dispatch = useDispatch();
  const { cards, loading, error } = useSelector((state) => state.card);
  console.log(cards, loading, error);
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/lists/${idList}/cards?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        dispatch(cardActions.fetchCards({ data: response.data, idList }));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          cardActions.error({
            status: true,
            message: "error in fetching cards",
          })
        );
      });
  }, []);

  if (error.status) {
    return <p>{error.message}</p>;
  }
  return (
    <>
      {cards[idList] && (
        <>
          {cards[idList].map((card) => (
            <Card
              list={list}
              id={card.id}
              key={card.id}
              card={card}
            />
          ))}
          <CreateCard idList={idList} />
        </>
      )}
    </>
  );
};

export default Cards;
