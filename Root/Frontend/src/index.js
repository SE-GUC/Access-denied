import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App.js";
//import TaskForm from "./Screens/TaskForm";
import * as serviceWorker from "./serviceWorker";
import Register from "./Screens/Register";
import CoworkingForm from "./Components/CoworkingForm.js";
import EducationalForm from "./Components/EducationalForm.js";
import ConsultancyForm from "./Components/ConsultancyForm.js";
import MemberForm from "./Components/MemberForm.js";
import PaymentMethodList from "./Components/PaymentMethodList";
//ReactDOM.render(<MemberForm />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"));
//ReactDOM.render(<Register />, document.getElementById("root"));
//ReactDOM.render(<CoworkingForm />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
