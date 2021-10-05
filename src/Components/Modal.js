import React from "react";
import styled from "styled-components";

// icon
import CloseIcon from "@mui/icons-material/Close";

const Modal = (props) => {
  const { visible, close } = props;
  return (
    <>
      {visible ? (
        <div>
          <ModalOverlay />
          <ModalWrapper>
            <h1>할일 추가</h1>
            <div>제목</div>
            <div>내용</div>
            <button>추가하기</button>
            <ButtonWrapper onClick={close}>
              <CloseIcon />
            </ButtonWrapper>
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
  position: fixed;
  top: 5%;
  right: 5%;
`;

export default Modal;
