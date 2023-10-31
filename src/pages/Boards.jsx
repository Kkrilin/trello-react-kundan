import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "../components/Board";
import CreateBoard from "../components/CreateBoard";
import Message from "../components/Message";
import TrelloLoading from "../components/TrelloLoading";
import { fetchBoards } from "../store/boardsActions";
import { Box } from "@mui/material";

const Boards = () => {
  const dispatch = useDispatch();
  const { boards, loading, error } = useSelector((state) => state.board);
  // console.log(boards);
  useEffect(() => {
    document.title = "Trello";

    dispatch(fetchBoards());
  }, []);

  return (
    <>
      {loading && <TrelloLoading />}
      {!loading && error.status && <Message message={error} />}
      {!loading && !error.status && (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {boards.map((board) => {
            return <Board key={board.id} board={board} />;
          })}
          <CreateBoard boards={boards} dispatch={dispatch} />
        </Box>
      )}
    </>
  );
};

export default Boards;
