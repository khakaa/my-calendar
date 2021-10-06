import React from "react";
import styled from "styled-components";
// material UI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
// history
import { history } from "../redux/configStore";
// action
import { actionCreators as calendarActions } from "../redux/modules/calendar";
import { useDispatch, useSelector } from "react-redux";

const Addtodo = (props) => {
  const dispatch = useDispatch();
  const scheduleList = useSelector((state) => state.calendar.scheduleList);
  const inputTodo = React.useRef(null);
  const inputDate = React.useRef(null);

  console.log(scheduleList);
  const buttonStyles = {
    backgroundColor: "black",
    color: "white",
  };

  // const schedule = {
  //   date: inputDate.current.value,
  //   todo: inputTodo.current.value,
  // };

  // console.log(schedule);
  return (
    <>
      <Card>
        <h1>할 일 추가</h1>
        <TextField
          inputRef={inputDate}
          id="datetime-local"
          label="일시"
          type="datetime-local"
          defaultValue="연도"
          sx={{ maxWidth: 300 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          inputRef={inputTodo}
          id="standard-basic"
          label="내용"
          variant="standard"
        />
        <Button
          style={buttonStyles}
          variant="outlined"
          color="inherit"
          onClick={() => {
            // console.log(inputTodo.current.value, inputDate.current.value);
            dispatch(
              calendarActions.addTodoFB({
                date: inputDate.current.value,
                todo: inputTodo.current.value,
              })
            );
            // history.push("/");
          }}
        >
          추가하기
        </Button>
        <ButtonWrapper
          onClick={() => {
            history.push("/");
          }}
        >
          <CloseIcon />
        </ButtonWrapper>
      </Card>
    </>
  );
};

const Card = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 50vw;
  max-width: 700px;
  height: 50vh;
  padding: 30px;
  background-color: white;
  z-index: 30;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
`;

const ButtonWrapper = styled.div`
  position: fixed;
  top: 5%;
  right: 5%;
`;
export default Addtodo;
