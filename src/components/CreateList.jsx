import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { listActions } from "../store/listSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifycontent: "center",
  gap: "1rem",
};

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default function CreateList({ boardId, dispatch }) {
  const [open, setOpen] = useState(false);
  const [listName, setListName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleListCreateButton = () => {
    // dispatch(listActions.fetchDataRequested());
    axios
      .post(
        `https://api.trello.com/1/boards/${boardId}/lists?name=${listName}&key=${apiKey}&token=${token}`
      )
      .then((response) => {
        dispatch(listActions.addList(response.data));
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

    setOpen(false);
  };

  return (
    <div style={{ margin: "1rem" }}>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Create List
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            InputProps={{ autoFocus: true }}
            onChange={(e) => setListName(e.target.value)}
            id="filled-basic"
            label="list Name"
            variant="outlined"
          />
          <Button variant="contained" onClick={handleListCreateButton}>
            create List
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
