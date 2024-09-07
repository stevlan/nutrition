
import React from 'react';
import ReactDOM from 'react-dom';
import InputField from './input';
import Search from './search'
import './styles.css';



ReactDOM.render(
  <React.StrictMode>
    <InputField />
  </React.StrictMode>,
  document.querySelector("#inputFieldContainer") 
);

ReactDOM.render(
  <React.StrictMode>
    <Search />
  </React.StrictMode>,
  document.querySelector("#search")
);