import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import axios from "axios";

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

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default function CreateBoard({ setBoards }) {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateButton = () => {
    axios
      .post(
        `https://api.trello.com/1/boards/?name=${boardName}&key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        console.log(response);
        setBoards((boards) => [...boards, response.data]);
      });

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Create Board</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            InputProps={{ autoFocus: true }}
            onChange={(e) => setBoardName(e.target.value)}
            id="filled-basic"
            label="Board Name"
            variant="outlined"
          />
          <Button variant="contained" onClick={handleCreateButton}>
            create Board
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
