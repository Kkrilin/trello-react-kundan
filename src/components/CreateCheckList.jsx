import { useState } from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { TextField } from "@mui/material";
import axios from "axios";
import { checklistsActions } from "../store/checListSlice";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

export default function CreateCheckList({ idCard, setCheckLists, dispatch }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [checklistName, setCheckListName] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAddCheclistButton = () => {
    axios
      .post(
        `https://api.trello.com/1/cards/${idCard}/checklists?key=${apiKey}&token=${token}`,
        {
          name: checklistName,
        }
      )
      .then((response) => {
        dispatch(checklistsActions.addCheckList(response.data));
        console.log(response.data);
        setCheckListName("");
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          checklistsActions.fetchError({
            message: error.message,
            response: error.response.data,
            status: true,
          })
        );
      });
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        create checkList
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ marginTop: "1rem" }}>
          <TextField
            InputProps={{ autoFocus: true }}
            onChange={(e) => setCheckListName(e.target.value)}
            value={checklistName}
            id="filled-basic"
            label="checklist Name"
            variant="outlined"
          />
          <Button onClick={handleAddCheclistButton} variant="contained">
            add checklist
          </Button>
        </Box>
      </Popover>
    </div>
  );
}
