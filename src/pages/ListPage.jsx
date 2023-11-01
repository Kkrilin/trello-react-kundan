import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Loading from "../components/Loading";
import BoardList from "../components/BoardList";
import CreateList from "../components/CreateList";
import Message from "../components/Message";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

function ListPage() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState({
    status: false,
  });
  const { boardId } = useParams();
  const {
    state: { boardName },
  } = useLocation();

  useEffect(() => {
    document.title = boardName;
    axios
      .get(
        `https://api.trello.com/1/boards/${boardId}/lists?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        setLists(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErrorMessage({
          message: error.message,
          response: error.response.data,
          status: true,
        });
      });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && errorMessage.status && <Message message={errorMessage} />}
      {!loading && !errorMessage.status && (
        <>
          <Typography sx={{ textAlign: "center" }} color="white" variant="h4">
            Lists In Board: {boardName}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            {lists.map((list) => (
              <BoardList
                setErrorMessage={setErrorMessage}
                key={list.id}
                list={list}
                setLists={setLists}
              />
            ))}
            <CreateList
              setErrorMessage={setErrorMessage}
              setLists={setLists}
              boardId={boardId}
            />
          </Box>
        </>
      )}
    </>
  );
}

export default ListPage;
