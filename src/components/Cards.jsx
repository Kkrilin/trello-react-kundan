import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateCard from "./CreateCard";
import Card from "./Card";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;
const Cards = ({ setErrorMessage, idList, list }) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/lists/${idList}/cards?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        setCards(response.data);
      });
  }, []);

  return (
    <>
      {cards.map((card) => (
        <Card
          setErrorMessage={setErrorMessage}
          list={list}
          id={card.id}
          key={card.id}
          card={card}
          setCards={setCards}
        />
      ))}
      <CreateCard
        setErrorMessage={setErrorMessage}
        setCards={setCards}
        idList={idList}
      />
    </>
  );
};

export default Cards;
