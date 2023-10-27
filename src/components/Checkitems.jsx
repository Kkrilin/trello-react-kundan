import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import axios from "axios";
import { Checklist } from "@mui/icons-material";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const Checkitems = ({ setCheckList, checkitem, idCard }) => {
  const handleCheckItemChange = (e) => {
    const checkItemState = e.target.checked ? "complete" : "incomplete";
    // console.log(e.target.checked);
    axios
      .put(
        `https://api.trello.com/1/cards/${idCard}/checkItem/${checkitem.id}?key=${ApiKey}&token=${token}`,
        {
          state: checkItemState,
        }
      )
      .then((response) => {
        setCheckList((preChecklist) => {
          const newCheckItem = preChecklist.checkItems.map((checkitem) =>
            checkitem.id === response.data.id ? response.data : checkitem
          );
          //   console.log("p triggered");
          return { ...preChecklist, checkItems: newCheckItem };
        });
      });
  };

  const handleDeleteCheckItem = () => {
    axios
      .delete(
        `https://api.trello.com/1/cards/${idCard}/checkItem/${checkitem.id}?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        setCheckList((preChecklist) => {
          const newCheckItems = preChecklist.checkItems.filter((x, index) => {
            console.log(index, x.id);
            console.log(index, checkitem.id);
            return x.id !== checkitem.id;
          });
          console.log("p triggered", newCheckItems);
          return { ...preChecklist, checkItems: newCheckItems };
        });
        // console.log(response);
      });
    // console.log("delete");
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

export default Checkitems;
