import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const Checkitem = ({ setCheckList, checkitem, idCard, dispatch }) => {
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
        dispatch({ type: "CHECK_CHECKITEM", payload: response.data });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: {
            message: error.message,
            response: error.response.data,
            status: true,
          },
        });
        console.log(error);
      });
  };

  const handleDeleteCheckItem = () => {
    axios
      .delete(
        `https://api.trello.com/1/cards/${idCard}/checkItem/${checkitem.id}?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        dispatch({ type: "DELETE_ITEM", payload: checkitem });
      })
      .catch((error) => {
        dispatch({
          type: "ERROR",
          payload: {
            message: error.message,
            response: "checkitem can not be deleted check api",
            status: true,
          },
        });
        console.log(error);
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
