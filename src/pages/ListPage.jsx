import axios from "axios";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import BoardList from "../components/BoardList";
import CreateList from "../components/CreateList";
import { useDispatch, useSelector } from "react-redux";
import { listActions } from "../store/listSlice";
import Message from "../components/Message";
import TrelloLoading from "../components/TrelloLoading";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

function ListPage() {
  const dispatch = useDispatch();
  const { lists, loading, error } = useSelector((state) => state.list);
  const { boardId } = useParams();
  const {
    state: { boardName },
  } = useLocation();

  useEffect(() => {
    document.title = boardName;
    // dispatch(listActions.fetchDataRequested());
    axios
      .get(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        dispatch(listActions.fetchDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          listActions.fetchDataFailed({
            message: error.message,
            response: error.response.data,
            status: true,
          })
        );
      });
  }, []);

  return (
    <>
      {loading && <TrelloLoading />}
      {/* {error.status && <Message message={error} />} */}
      {!loading && error.status && <Message message={error} />}
      {!loading && !error.status && (
        <>
          <Typography sx={{ textAlign: "center" }} color="white" variant="h4">
            Lists In Board: {boardName}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {lists.map((list) => (
              <BoardList key={list.id} list={list} dispatch={dispatch} />
            ))}
            <CreateList dispatch={dispatch} boardId={boardId} />
          </Box>
        </>
      )}
    </>
  );
}

export default ListPage;
