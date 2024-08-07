import {database} from "./database.js";

let btn = document.querySelector(".button");
btn.addEventListener("click", database.search);

