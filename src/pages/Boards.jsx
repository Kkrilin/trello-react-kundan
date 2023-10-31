import { useEffect, useState } from "react";
import Board from "../components/Board";
import Loading from "../components/Loading";
import { Box } from "@mui/material";
import axios from "axios";
import CreateBoard from "../components/CreateBoard";
import Message from "../components/Message";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;
const memberID = import.meta.env.VITE_MEMBER_ID;

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState({});
  useEffect(() => {
    document.title = "Trello";
    axios
      .get(
        `https://api.trello.com/1/members/${memberID}/boards?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        setBoards(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage({
          message: error.message,
          response: error.response.data,
          status: true,
        });
        console.log(error.message);
        console.log(error.response.data);
      });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && errorMessage.status && <Message message={errorMessage} />}
      {!loading && !errorMessage.status && (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {boards.map((board) => {
            return <Board key={board.id} board={board} />;
          })}
          <CreateBoard boards={boards} setBoards={setBoards} />
        </Box>
      )}
    </>
  );
};

export default Boards;
