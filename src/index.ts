

import App from "./view/App";
import reducers from "./reducer/reducers";
const React = require("react");
const ReactDOM = require("react-dom");
const redux = require("redux");
const reduxThunk = require("redux-thunk").default;


setTimeout(() => {
    const middlewareArgs = [reduxThunk];
    const reduxMiddleware = redux.applyMiddleware(...middlewareArgs);
    const store = redux.createStore(reducers, null, reduxMiddleware);

    const div = document.createElement("div");
    div.id = "react";
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(div);

    const content = React.createElement(App, { store });
    ReactDOM.render(content, document.getElementById("react"));
});
