import "./App.css";
import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";

import Calendar from "./Components/Calender";
import Addtodo from "./Components/Addtodo";
import React from "react";

import { useDispatch } from "react-redux";
import { actionCreators as calendarActions } from "./redux/modules/calendar";

function App() {
  // const dispatch = useDispatch();
  // React.useEffect(() => {
  //   dispatch(calendarActions.setTodoFB());
  // }, []);
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Calendar} />
        <Route path="/add" exact component={Addtodo} />
      </ConnectedRouter>
    </>
  );
}

export default App;
