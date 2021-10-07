import React from "react";
import "bootswatch/dist/minty/bootstrap.min.css";

import { Route } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configStore";
//components
import Calendar from "./Components/Calender";
import Addtodo from "./Components/Addtodo";

function App() {
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
