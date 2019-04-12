import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
<<<<<<< HEAD
import App from "./App";
=======
import App from "./App.js";
//import TaskForm from "./Screens/TaskForm";
>>>>>>> d4ba196185bfe1e45b0d30ebf1a4f541c4e17b78
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App/>, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
