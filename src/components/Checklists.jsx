import axios from "axios";
import { useEffect, useReducer } from "react";
import CheckList from "./CheckList";
import CreateCheckList from "./CreateCheckList";
import { Typography } from "@mui/material";
import { initialState } from "../reducer/checkListReducer";
import checkListReducer from "../reducer/checkListReducer";
import CircularLoading from "./CircularLoading";
import Message from "./Message";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const Checklists = ({ Card, list }) => {
  const [state, dispatch] = useReducer(checkListReducer, initialState);
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${Card.id}/checklists?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        dispatch({ type: "FETCH_CHECKLISTS", payload: response.data });
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
  }, []);

  return (
    <>
      {state.loading && <CircularLoading />}
      {!state.loading && state.error.status && (
        <Message message={state.error} />
      )}
      {!state.loading && !state.error.status && (
        <>
          <Typography variant="h5">{`${Card.name} in List ${list.name}`}</Typography>
          {state.checkLists.map((checklist) => (
            <CheckList
              checkLists={state.checkLists}
              idChecklist={checklist.id}
              key={checklist.id}
              dispatch={dispatch}
              idCard={Card.id}
              checklist={checklist}
            />
          ))}
          <CreateCheckList dispatch={dispatch} idCard={Card.id} />
        </>
      )}
    </>
  );
};

export default Checklists;
