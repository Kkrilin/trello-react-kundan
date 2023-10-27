import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Stack, TextField } from "@mui/material";

import { Button } from "@mui/material";
import ProgressBar from "./ProgressBar";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkitems from "./Checkitems";
import axios from "axios";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const CheckList = ({
  checkLists,
  checklist,
  idCard,
  setCheckLists,
  idChecklist,
}) => {
  const [checkList, setCheckList] = useState(checklist);
  const [checkItemName, setCheckItemName] = useState("");
  const handleDeleteChecklist = () => {
    axios
      .delete(
        `https://api.trello.com/1/cards/${idCard}/checklists/${checklist.id}?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        console.log(response.data);
        setCheckLists(() => response.data);
      });
  };

  const handleAddCheckItem = () => {
    axios
      .post(
        `https://api.trello.com/1/checklists/${checkList.id}/checkItems?name=${checkItemName}&key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        console.log(response);
        setCheckList((preChecklist) => {
          const newCheckItem = [...preChecklist.checkItems, response.data];
          return { ...preChecklist, checkItems: newCheckItem };
        });
        setCheckItemName("");
      });
    console.log(checkItemName);
  };

  return (
    <Box
      sx={{ padding: "1rem", border: "1px solid black", marginTop: "0.5rem" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">{checklist.name}</Typography>
        <Button
          onClick={handleDeleteChecklist}
          size="big"
          variant="text"
          endIcon={<DeleteIcon />}
        ></Button>
      </Box>
      <FormGroup>
        {checkList.checkItems.length !== 0 && (
          <ProgressBar checkList={checkList} />
        )}

        {checkList.checkItems.map((checkitem) => (
          <Checkitems
            setCheckList={setCheckList}
            checkList={checkList}
            idCard={idCard}
            key={checkitem.id}
            checkitem={checkitem}
          />
        ))}
      </FormGroup>
      <Stack direction={"row"}>
        <TextField
        
          sx={{ marginBottom: "1rem", marginTop: "0.5rem" }}
          onChange={(e) => setCheckItemName(e.target.value)}
          value={checkItemName}
          size="small"
          id="filled-basic"
          label="checkItem Name"
          variant="outlined"
        />
        <Button
          sx={{ marginBottom: "1rem", marginTop: "0.5rem" }}
          disableRipple
          variant="outlined"
          onClick={handleAddCheckItem}
        >
          add item
        </Button>
      </Stack>
    </Box>
  );
};

export default CheckList;
