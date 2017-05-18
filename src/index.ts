

import { actions } from "./action/actions";
import App from "./view/App";
import reducers from "./reducer/reducers";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as redux from "redux";
import reduxThunk from "redux-thunk";
// import { createLogger } from "redux-logger";



// I'm not really crazy about this but I want webpack to do the work. CSS will be extracted from the bundle.
require("../style/app");


setTimeout(() => {
    const middlewareArgs = [reduxThunk];
    // const reduxLog = createLogger({
    //     colors: {
    //         action: () => "blue",
    //         error: () => "blue",
    //         nextState: () => "blue",
    //         prevState: () => "blue",
    //         title: () => "blue"
    //     },
    //     level: {
    //         action: () => "log",
    //         error: () => "log",
    //         nextState: () => "log",
    //         prevState: () => "log",
    //     }
    // });
    // middlewareArgs.push(reduxLog);

    const reduxMiddleware = redux.applyMiddleware(...middlewareArgs);
    const store = redux.createStore(reducers, {}, reduxMiddleware);

    const div = document.createElement("div");
    div.id = "react";
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(div);

    const content = React.createElement(App, { store });
    ReactDOM.render(content, document.getElementById("react"));

    store.dispatch(actions.getImage([]));
    getImages(store);
});


function getImages(store) {
    // Demo purposes only!
    setInterval(() => {
        const state = store.getState();
        store.dispatch(actions.getImage(state.image.images));
    }, 5 * 1000);
}
