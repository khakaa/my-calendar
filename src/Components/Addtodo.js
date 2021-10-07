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

const Addtodo = () => {
  const dispatch = useDispatch();
  const scheduleList = useSelector((state) => state.calendar.scheduleList);
  // const inputTodo = React.useRef(null);
  // const inputDate = React.useRef(null);
  const [inputDate, setInputDate] = React.useState("");
  const [inputTodo, setInputTodo] = React.useState("");
  console.log(scheduleList);
  const buttonStyles = {
    width: "8vw",
    height: "5.5vh",
    backgroundColor: "#67B79D",
    color: "white",
  };

  const submit = () => {
    if (inputDate === "" || inputTodo === "") {
      window.alert("일시 또는 내용을 입력해주셔야 합니다! 😊");
      return;
    }
    dispatch(
      calendarActions.addTodoFB({
        date: inputDate,
        todo: inputTodo,
      })
    );
  };

  return (
    <div style={{ backgroundColor: "#rgb(158 223 202" }}>
      <Card>
        <h1>할 일 추가</h1>
        <TextField
          // inputRef={inputDate}
          id="datetime-local"
          label="일시"
          type="datetime-local"
          defaultValue="연도"
          sx={{ maxWidth: 300 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            // console.log(e.target.value);
            setInputDate(e.target.value);
          }}
        />
        <TextField
          // inputRef={inputTodo}
          id="standard-basic"
          label="내용"
          variant="standard"
          onChange={(e) => {
            // console.log(e.target.value);
            setInputTodo(e.target.value);
          }}
        />
        <Button
          style={buttonStyles}
          variant="outlined"
          color="inherit"
          onClick={() => {
            submit();
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
    </div>
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
