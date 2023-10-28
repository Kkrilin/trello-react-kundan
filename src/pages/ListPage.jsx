import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import ListC from "../components/ListC";
import CreateList from "../components/CreateList";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

function ListPage() {
  const [lists, setLists] = useState([]);
  const { boardId } = useParams();
  const {
    state: { boardName },
  } = useLocation();

  useEffect(() => {
    document.title = boardName;
    axios
      .get(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        setLists(response.data);
      });
  }, []);

  return (
    <>
      <Typography sx={{ textAlign: "center" }} color="white" variant="h4">
        Lists In Board: {boardName}
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {lists.map((list) => (
          <ListC key={list.id} list={list} setLists={setLists} />
        ))}
        <CreateList setLists={setLists} boardId={boardId} />
      </Box>
    </>
  );
}

export default ListPage;
