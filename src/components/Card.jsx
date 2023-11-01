import * as React from "react";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import { ListItem } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Checklists from "./Checklists";
import { cardActions } from "../store/cardSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  maxHeight: "90vh",
  overflowY: "scroll",
};

export default function Card({ id, card, list }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteCard = () => {
    axios
      .delete(
        `https://api.trello.com/1/cards/${card.id}?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        dispatch(
          cardActions.deleteCard({
            idList: list.id,
            idCard: id,
          })
        );
        // setCards((prvCards) => prvCards.filter((card) => card.id !== id));
      })
      .catch((error) => {
        dispatch(
          cardActions.error({
            status: true,
            message: "error in deleting card",
          })
        );
      });
  };

  return (
    <Paper sx={{ width: "inherit" }}>
      <ListItem sx={{ cursor: "pointer" }}>
        <React.Fragment>
          <ListItemText onClick={handleOpen}>{card.name}</ListItemText>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <Checklists list={list} idCard={card.id} Card={card} />
            </Box>
          </Modal>
        </React.Fragment>
        <Button
          onClick={handleDeleteCard}
          variant="text"
          startIcon={<DeleteIcon />}
        ></Button>
      </ListItem>
      <Divider />
    </Paper>
  );
}
