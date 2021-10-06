import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

// reducer module
import Calendar from "./modules/calendar";

// 히스토리 만들어서 스토리에 넣어주기
export const history = createBrowserHistory();

const rootReducer = combineReducers({
  calendar: Calendar,
  router: connectRouter(history),
});

// middleware에 history 인수를 넘겨줌
const middlewares = [thunk.withExtraArgument({ history: history })];

// 개발환경
const env = process.env.NODE_ENV;

// logger
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// devtools
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// 미들웨어 묶기
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
