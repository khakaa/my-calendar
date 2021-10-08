import React, { useState } from "react";
import styled from "styled-components";
// 캘린더 패키지
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import bootstrapPlugin from "@fullcalendar/bootstrap";
// redux
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configStore";
//action
import { actionCreators as calendarActions } from "../redux/modules/calendar";
// components
import Modal from "./Modal";
// material ui
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import TodayIcon from "@mui/icons-material/Today";

const Calendar = (props) => {
  const dispatch = useDispatch();

  const [completedTodo, setCompletedTodo] = useState(false);
  const [buttonShow, setButtonShow] = useState(false);
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

  // false : 모든일정 , true : 완료된 일정
  const showCompletedSchedule = (bool) => {
    setCompletedTodo(bool);
  };

  // false : 완료일정버튼, true : 모든일정버튼
  const clickButton = (bool) => {
    setButtonShow(bool);
  };

  // 일정 상세 모달창 띄우기
  const showDetail = (id) => {
    let targetSchedule = scheduleList.filter((s, idx) => {
      return id === s.id;
    });

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
    modalOpen();
  };

  const calendarList = scheduleList.map((s, idx) => {
    return {
      id: s.id,
      title: s.todoList,
      start: s.dateList,
      color: s.completed ? "#67c2e0" : "pink", // 완료 상태에 따라 색상 변경
      completed: s.completed,
    };
  });

  const completedList = calendarList.filter((c, idx) => {
    return c.completed === true;
  });

  return (
    <>
      <FullCalendar
        events={completedTodo ? completedList : calendarList}
        plugins={[bootstrapPlugin, dayGridPlugin]}
        height="100vh"
        backgroundColor="gray"
        headerToolbar={{
          left: "",
          center: "title",
          right: "prev,next",
        }}
        eventClick={(info) => showDetail(info.event.id)}
        eventDisplay="block"
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
      />
      {buttonShow ? (
        <CompleteButton
          onClick={() => {
            showCompletedSchedule(false);
            clickButton(false);
          }}
        >
          <TodayIcon />
          <span>모든 일정 보기</span>
        </CompleteButton>
      ) : (
        <CompleteButton
          onClick={() => {
            showCompletedSchedule(true);
            clickButton(true);
          }}
        >
          <CheckIcon />
          <span>완료 일정 보기</span>
        </CompleteButton>
      )}
      <AddButton
        onClick={() => {
          history.push("/add");
        }}
      >
        <AddIcon /> <span>추가하기</span>
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
    </>
  );
};

const CompleteButton = styled.button`
  padding: 10px;
  border-radius: 23px;
  position: fixed;
  top: 70vh;
  z-index: 10;
  right: 30px;
  width: 150px;
  border: none;
  color: white;
  background-color: #b6ded1;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
  @media screen and (max-width: 550px) {
    width: 50px;
    span {
      display: none;
    }
  } ;
`;

const AddButton = styled.button`
  padding: 10px;
  border-radius: 23px;
  position: fixed;
  top: 79vh;
  z-index: 10;
  right: 30px;
  width: 150px;
  border: none;
  color: white;
  background-color: #b6ded1;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12), 0 2px 5px rgba(0, 0, 0, 0.24);
  @media screen and (max-width: 550px) {
    width: 50px;
    span {
      display: none;
    }
  } ;
`;

export default Calendar;
