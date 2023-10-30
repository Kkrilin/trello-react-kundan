import axios from "axios";
import { useEffect} from "react";
import CheckList from "./CheckList";
import CreateCheckList from "./CreateCheckList";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checklistsActions } from "../store/checListSlice";

const ApiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;

const Checklists = ({ Card, list }) => {
  const dispatch = useDispatch();
  const { checkLists } = useSelector((state) => state.checkList);
  console.log(checkLists);
  useEffect(() => {
    axios
      .get(
        `https://api.trello.com/1/cards/${Card.id}/checklists?key=${ApiKey}&token=${token}`
      )
      .then((response) => {
        dispatch(checklistsActions.fetchData(response.data));
        console.log(checklistsActions.fetchData(response.data))
      });
  }, []);

  console.log();
  return (
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
  );
};

export default Checklists;
