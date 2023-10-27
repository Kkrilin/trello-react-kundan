import axios from "axios";
import { useEffect, useState } from "react";
import CheckList from "./CheckList";
import CreateCheckList from "./CreateCheckList";
import { Typography } from "@mui/material";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const Checklists = ({ Card,list }) => {
  const [checkLists, setCheckLists] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${Card.id}/checklists?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        setCheckLists(() => response.data);
        // console.log(response.data);
      });
  }, []);

  return (
    <>
    <Typography>{`${Card.name} in List ${list.name}`}</Typography>
      {checkLists.map((checklist) => (
        <CheckList
          checkLists={checkLists}
          idChecklist={checklist.id}
          key={checklist.id}
          setCheckLists={setCheckLists}
          idCard={Card.id}
          checklist={checklist}
        />
      ))}
      <CreateCheckList idCard={Card.id} setCheckLists={setCheckLists} />
    </>
  );
};

export default Checklists;
