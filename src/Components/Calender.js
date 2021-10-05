import React, { useState } from "react";
import styled from "styled-components";

// 캘린더 패키지
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Modal from "./Modal";

const Calender = (props) => {
  const [visible, setVisible] = useState(false);

  const modalOpen = () => {
    setVisible(true);
  };

  const modalClose = (e) => {
    setVisible(false);
  };

  console.log(visible);
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="100vh"
        headerToolbar={{
          start: "", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "prev,next",
        }}
      />
      <CompleteButton>완료된 일정</CompleteButton>
      <AddButton onClick={modalOpen}>추가하기</AddButton>
      <Modal visible={visible} close={modalClose} />
    </>
  );
};

const CompleteButton = styled.button`
  padding: 10px;
  border-radius: 16px;
  position: fixed;
  top: 80vh;
  z-index: 10;
  right: 30px;
`;

const AddButton = styled.button`
  padding: 10px;
  border-radius: 16px;
  position: fixed;
  top: 89vh;
  z-index: 10;
  right: 30px;
`;

export default Calender;
