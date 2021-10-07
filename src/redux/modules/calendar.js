import { createAction, handleActions } from "redux-actions"; //액션, 리듀서를 편하게 만들어 주는 것
import { produce } from "immer";

import { firestore } from "../../firebase";
import { history } from "../configStore";

// action
const ADD_TODO = "ADD_TODO";
const SET_TODO = "SET_TODO";
const UPDATE_TODO = "UPDATE_TODO";
const DELETE_TODO = "DELETE_TODO";

//action creators
const addTodo = createAction(ADD_TODO, (scheduleList) => ({ scheduleList }));
const setTodo = createAction(SET_TODO, (scheduleList) => ({ scheduleList }));
const updateTodo = createAction(UPDATE_TODO, (id) => ({ id }));
const deleteTodo = createAction(DELETE_TODO, (id) => ({ id }));

const initialState = {
  scheduleList: [],
  completedList: [],
};

// middle ware function
const setTodoFB = () => {
  return function (dispatch, getState) {
    const scheduleDB = firestore.collection("schedule");
    scheduleDB.get().then((docs) => {
      let scheduleList = [];
      docs.forEach((doc) => {
        scheduleList = [...scheduleList, { ...doc.data(), id: doc.id }];
      });
      dispatch(setTodo(scheduleList));
    });
  };
};

const addTodoFB = (schedule) => {
  return function (dispatch) {
    const scheduleDB = firestore.collection("schedule");
    let scheduleList = {
      dateList: schedule.date,
      todoList: schedule.todo,
      completed: false,
    };
    scheduleDB.add(scheduleList).then((docRef) => {
      scheduleList = { ...scheduleList, id: docRef.id };
      dispatch(addTodo(scheduleList));
      history.push("/");
    });
  };
};

const updateTodoFB = (id) => {
  return function (dispatch, getState) {
    const scheduleDB = firestore.collection("schedule");
    const scheduleList = getState().calendar.scheduleList;
    scheduleDB
      .doc(id)
      .update({ completed: true })
      .then(() => {
        dispatch(setTodoFB());
        // dispatch(updateTodo(id, ))
      });
  };
};

const deleteTodoFB = (id) => {
  return function (dispatch, getState) {
    const scheduleDB = firestore.collection("schedule");
    scheduleDB
      .doc(id)
      .delete()
      .then(() => {
        // dispatch(deleteTodo(id));
        // dispatch(deleteTodoFB(id));
        dispatch(setTodoFB());
      });
  };
};

//reducer
export default handleActions(
  {
    [ADD_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList.push(action.payload.scheduleList);
      }),
    [SET_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList = action.payload.scheduleList;
      }),
    [DELETE_TODO]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList.filter((s, idx) => {
          return s.id !== action.payload.id;
        });
      }),
  },
  initialState
);

const actionCreators = {
  addTodo,
  setTodo,
  deleteTodo,
  addTodoFB,
  setTodoFB,
  updateTodoFB,
  deleteTodoFB,
};

export { actionCreators };
