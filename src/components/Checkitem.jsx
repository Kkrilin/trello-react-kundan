import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import axios from "axios";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const Checkitem = ({ setCheckList, checkitem, idCard, dispatch }) => {
  const handleCheckItemChange = (e) => {
    const checkItemState = e.target.checked ? "complete" : "incomplete";
    axios
      .put(
        `https://api.trello.com/1/cards/${idCard}/checkItem/${checkitem.id}?key=${ApiKey}&token=${token}`,
        {
          state: checkItemState,
        }
      )
      .then((response) => {
        dispatch({ type: "CHECK_CHECKITEM", payload: response.data });
        console.log(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteCheckItem = () => {
    axios
      .delete(
        `https://api.trello.com/1/cards/${idCard}/checkItem/${checkitem.id}?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        dispatch({ type: "DELETE_ITEM", payload: checkitem });
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
