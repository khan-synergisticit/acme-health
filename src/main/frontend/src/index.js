import React from "react";
import * as ReactDOM from "react-dom/client"
import {
    BrowserRouter as Router
} from "react-router-dom";
import { Provider } from "react-redux";
import ApplicationComponent from "./components/app/app.jsx";
import store from "./state/store";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <Router>
            <ApplicationComponent/>
        </Router>
    </Provider>

)
