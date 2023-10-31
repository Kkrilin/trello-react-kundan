import { useState } from "react";
import { createBoard } from "../store/boardsActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

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

export default function CreateBoard({ boards, dispatch }) {
  const [open, setOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const handleOpen = () => {
    if (boards.length < 10) setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCreateButton = () => {
    dispatch(createBoard(boardName));
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        {boards.length === 10
          ? "reached maximun number of board creation "
          : "Create Board"}
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
