import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import axios from "axios";
import { checklistsActions } from "../store/checListSlice";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const Checkitem = ({ checkitem, idCard, dispatch }) => {
  const handleCheckItemChange = (e) => {
    const checkItemState = e.target.checked ? "complete" : "incomplete";
    axios
      .put(
        `https://api.trello.com/1/cards/${idCard}/checkItem/${checkitem.id}?key=${apiKey}&token=${token}`,
        {
          state: checkItemState,
        }
      )
      .then((response) => {
        dispatch(checklistsActions.checkCheckItem(response.data));
      })
      .catch((error) => {
        dispatch(
          checklistsActions.fetchError({
            message: error.message,
            response: error.response.data,
            status: true,
          })
        );
      });
  };

  const handleDeleteCheckItem = () => {
    axios
      .delete(
        `https://api.trello.com/1/cards12/${idCard}/checkItem/${checkitem.id}?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        dispatch(checklistsActions.deleteCheckItem(checkitem));
      })
      .catch((error) => {
        dispatch(
          checklistsActions.fetchError({
            message: error.message,
            response: error.code,
            status: true,
          })
        );
      });
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={checkitem.state === "complete"}
            onChange={handleCheckItemChange}
          />
        }
        label={checkitem.name}
      />
      <Button
        onClick={handleDeleteCheckItem}
        size="small"
        variant="text"
        startIcon={<DeleteIcon />}
      ></Button>
    </Box>
  );
};

export default Checkitem;
