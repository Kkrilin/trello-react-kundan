import { boardActions } from "./boardSlice";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const token = import.meta.env.VITE_TOKEN;
const memberID = import.meta.env.VITE_MEMBER_ID;

export const fetchBoards = () => {
  return async (dispatch) => {
    dispatch(boardActions.fetchDataRequested());
    axios
      .get(
        `https://api.trello.com/1/members/${memberID}/boards?key=${apiKey}&token=${token}`
      )
      .then((response) => {
        dispatch(boardActions.fetchDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(
          boardActions.fetchDataFailed({
            message: error.message,
            response: error.response.data,
            status: true,
          })
        );
      });
  };
};
export const createBoard = (boardName) => {
  return async (dispatch) => {
    dispatch(boardActions.fetchDataRequested());
    axios
      .post(
        `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${token}`
      )
      .then((response) => {
        console.log(response);
        dispatch(boardActions.addBoard(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          boardActions.fetchDataFailed({
            message: error.message,
            response: error.response.data,
            status: true,
          })
        );
      });
  };
};
