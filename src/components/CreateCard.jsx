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

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default function CreateCard({ idList, setCards }) {
  const [open, setOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateCard = () => {
    axios
      .post(
        `https://api.trello.com/1/cards?idList=${idList}&key=${apiKey}&token=${token}`,
        {
          name: cardName,
        }
      )
      .then((response) => {
        console.log(response);
        setCards((preCards) => [...preCards, response.data]);
      });
    setOpen(false);
  };

  return (
    <div style={{textAlign:"center"}}>
      <Button onClick={handleOpen}>Create card</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            InputProps={{ autoFocus: true }}

            onChange={(e) => setCardName(e.target.value)}
            id="filled-basic"
            label="card Name"
            variant="outlined"
          />
          <Button variant="contained" onClick={handleCreateCard}>
            create card
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
