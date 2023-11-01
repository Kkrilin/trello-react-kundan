import axios from "axios";
import { useEffect } from "react";
import CheckList from "./CheckList";
import CreateCheckList from "./CreateCheckList";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checklistsActions } from "../store/checListSlice";
import CircularLoading from "./CircularLoading";
import Message from "./Message";
const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const Checklists = ({ Card, list }) => {
  const dispatch = useDispatch();
  const { checkLists, loading, error } = useSelector(
    (state) => state.checkList
  );
  console.log(checkLists);
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${Card.id}/checklists?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        dispatch(checklistsActions.fetchData(response.data));
        console.log(checklistsActions.fetchData(response.data));
      })
      .catch((error) => {
        dispatch(
          checklistsActions.fetchData({
            message: error.message,
            response: error.response.data,
            status: true,
          })
        );
      });
  }, []);

  console.log();
  return (
    <>
      {loading && <CircularLoading />}
      {!loading && error.status && <Message message={error} />}
      {!loading && !error.status && (
        <>
          <Typography variant="h5">{`${Card.name} in List ${list.name}`}</Typography>
          {checkLists.map((checklist) => (
            <CheckList
              checkLists={checkLists}
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
