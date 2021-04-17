import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import NavBar from './Components/NavBar';
import UsersList from './Components/UsersList';
import reportWebVitals from './reportWebVitals';
import ToDoList from './Components/ToDoList';
import Posts from "./Components/Posts"

ReactDOM.render(
  <React.StrictMode>
    <NavBar />
    <Posts />
    {/* <ToDoList/> */}
    {/* <UsersList /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
