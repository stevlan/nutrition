import {database} from "./database.js";
// import InputField from "./input.js";
// import React from 'react';
// import ReactDOM from 'react-dom/client';


// ReactDOM.render(<InputField />, document.querySelector("#inputFieldContainer"));

let btn = document.querySelector(".button");
btn.addEventListener("click", database.search);

