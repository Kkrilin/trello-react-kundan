import { useEffect, useState } from "react";
import BoardCard from "../components/BoardCard";
import { Box } from "@mui/material";
import axios from "axios";
import CreateBoard from "../components/CreateBoard";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;
const memberID = import.meta.env.VITE_MEMBER_ID;

const Boards = () => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    document.title = "Trello";
    axios
      .get(
        `https://api.trello.com/1/members/${memberID}/boards?key=${ApiKey}&token=${token}`
      )
      .then((response) => setBoards(response.data));
  }, []);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
      {boards.map((board) => {
        return <BoardCard key={board.id} board={board} />;
      })}
      <CreateBoard setBoards={setBoards} />
    </Box>
  );
};

export default Boards;
