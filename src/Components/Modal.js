import React from "react";
import styled from "styled-components";
// icon
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
//redux
import { useSelector } from "react-redux";
import { flexbox } from "@mui/system";

const Modal = (props) => {
  const { id, time, date, title, visible, close } = props;

  const buttonStyles = {
    backgroundColor: "black",
    color: "white",
    // margin: "0 5vw",
  };

  const scheduleList = useSelector((state) => state.calendar.scheduleList);
  // console.log(scheduleList);
  return (
    <>
      {visible ? (
        <div>
          <ModalOverlay />

          <ModalWrapper>
            <h1>My schedule</h1>
            <div>
              📌 {date} {time}
            </div>
            <div> 📓 {title}</div>
            <ButtonWrapper>
              <Button
                style={buttonStyles}
                variant="outlined"
                color="inherit"
                onClick={() => {}}
              >
                완료하기
              </Button>
              <Button
                style={buttonStyles}
                variant="outlined"
                color="inherit"
                onClick={() => {}}
              >
                삭제하기
              </Button>
            </ButtonWrapper>
            <CloseButtonWrapper onClick={close}>
              <CloseIcon />
            </CloseButtonWrapper>
          </ModalWrapper>
        </div>
      ) : null}
    </>
  );
};

const ModalOverlay = styled.div`
  position: absolute;
  opacity: 0.5;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  background-color: lightgray;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50vw;
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
  display: flex;
  justify-content: space-between;
  width: 25vw;
`;

const CloseButtonWrapper = styled.div`
  position: fixed;
  top: 5%;
  right: 5%;
`;

export default Modal;
