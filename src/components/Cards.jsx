import axios from "axios";
import React, { useEffect, useState } from "react";
import CreateCard from "./CreateCard";
import Card from "./card";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;
const Cards = ({ id,list }) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/lists/${id}/cards?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        setCards(response.data);
      });
  }, []);

  return (
    <>
      {cards.map((card) => (
        <Card list={list} id={card.id} key={card.id} card={card} setCards={setCards} />
      ))}
      <CreateCard setCards={setCards} idList={id} />
    </>
  );
};

export default Cards;
