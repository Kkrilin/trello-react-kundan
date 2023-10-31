import React, { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import { Stack, TextField } from "@mui/material";

import { Button } from "@mui/material";
import ProgressBar from "./ProgressBar";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkitem from "./Checkitem";
import { checklistsActions } from "../store/checListSlice";

import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const CheckList = ({ checkLists, checklist, idCard, dispatch }) => {
  const [checkItemName, setCheckItemName] = useState("");

  const handleDeleteChecklist = () => {
    axios
      .delete(
        `https://api.trello.com/1/cards/${idCard}/checklists/${checklist.id}?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        console.log(response.data);
        dispatch(checklistsActions.deleteCheckList(response.data));
      });
  };

  const handleAddCheckItem = () => {
    if (checkItemName !== "") {
      axios
        .post(
          `https://api.trello.com/1/checklists/${checklist.id}/checkItems?name=${checkItemName}&key=${ApiKey}&token=${token}`
        )
        .then((response) => {
          console.log(response.data);
          dispatch(checklistsActions.addCheckItem(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(checkItemName);
      setCheckItemName('')
    }
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
        {checklist.checkItems.length !== 0 && (
          <ProgressBar checkLists={checkLists} checklist={checklist} />
        )}

        {checklist.checkItems.map((checkitem) => (
          <Checkitem
            checklist={checklist}
            idCard={idCard}
            key={checkitem.id}
            checkitem={checkitem}
            dispatch={dispatch}
          />
        ))}
      </FormGroup>
      <Stack direction={"row"}>
        <TextField
          sx={{ marginBottom: "1rem", marginTop: "0.5rem" }}
          onChange={(e) => setCheckItemName(e.target.value)}
          value={checkItemName}
          required
          size="small"
          id="filled-basic"
          label="checkItem Name"
          variant="outlined"
          // error={checkItemName === ""}
          // helperText={"checkitem name required"}
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
