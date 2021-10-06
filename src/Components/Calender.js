import React, { useState } from "react";
import styled from "styled-components";
// 캘린더 패키지
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

// redux
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";
//action
import { actionCreators as calendarActions } from "../redux/modules/calendar";

import Modal from "./Modal";

const Calendar = (props) => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);
  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState(null);

  const scheduleList = useSelector((state) => state.calendar.scheduleList);

  React.useEffect(() => {
    dispatch(calendarActions.setTodoFB());
  }, []);

  const modalOpen = () => {
    setVisible(true);
  };

  const modalClose = () => {
    setVisible(false);
  };

  // info.event.start : Wed Oct 06 2021 15:33:00 GMT+0900 (한국 표준시)
  // info.event.title : '222'
  // info.event.startStr : 2021-10-06T15:33:00+09:00

  // 일정 상세 모달창 띄우기
  const showDetail = (id) => {
    let targetSchedule = scheduleList.filter((s, idx) => {
      return id === s.id;
    });
    // console.log(targetSchedule);

    let splitedDay = targetSchedule[0].dateList.split("T");
    let targetDate = splitedDay[0];
    let splitedTime = splitedDay[1].split(":");
    let meridiem = splitedTime[0] < 12 ? "오전" : "오후";
    let targetHour = splitedTime[0] > 12 ? splitedTime[0] - 12 : splitedTime[0];
    let targetMinute = splitedTime[1];
    let targetTitle = targetSchedule[0].todoList;

    setId(targetSchedule[0].id);
    setHour(meridiem + " " + targetHour);
    setMinute(targetMinute);
    setDate(targetDate);
    setTitle(targetTitle);
    // console.log(id, time, date, title);
    modalOpen();
  };

  const calendarList = scheduleList.map((s, idx) => {
    return { id: s.id, title: s.todoList, start: s.dateList };
  });

  // console.log(calendarList);
  return (
    <>
      <FullCalendar
        events={calendarList}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="100vh"
        headerToolbar={{
          start: "",
          center: "title",
          end: "prev,next",
        }}
        eventClick={(info) => showDetail(info.event.id)}
      />
      <CompleteButton>완료된 일정</CompleteButton>
      <AddButton
        onClick={() => {
          history.push("/add");
        }}
      >
        추가하기
      </AddButton>
      <Modal
        id={id}
        date={date}
        hour={hour}
        minute={minute}
        title={title}
        visible={visible}
        close={modalClose}
      />
      {/* onClick={modalOpen} */}
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

export default Calendar;
