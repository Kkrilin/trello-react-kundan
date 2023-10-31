import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Cards from "./Cards";
import { listActions } from "../store/listSlice";

import { Button, Divider, Typography } from "@mui/material";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default function BoardList({ dispatch, list }) {
  const handleDeleteList = () => {
    dispatch(listActions.fetchDataRequested());
    axios
      .put(
        `https://api.trello.com/1/lists/${list.id}/closed?key=${apiKey}&token=${token}`,
        {
          value: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        dispatch(listActions.deleteList(response.data));
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
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 250,
        bgcolor: "background.paper",
        margin: "1rem",
      }}
    >
      <List>
        <ListItem
          disablePadding
          sx={{
            marginLeft: "1rem",
            color: "GrayText",
          }}
        >
          <ListItemText
            primary={<Typography variant="h5">{list.name}</Typography>}
          />
          <Button
            onClick={handleDeleteList}
            variant="text"
            size="big"
            startIcon={<DeleteIcon />}
          ></Button>
        </ListItem>
      </List>
      <Divider />
      <Cards list={list} idList={list.id} />
    </Box>
  );
}
