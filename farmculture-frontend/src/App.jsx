import React from "react";
import{
  BrowserRouter as Router ,
  Routes,
  Route, 
  BrowserRouter 

}from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
// import Login from "./auth/login";
import ResultPage from "./pages/ResultPage";
import Login from "./auth/login";
import Register from "./auth/register";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
     <Route path="/" element={<Home/>}/>
      <Route path="/form" element={<FormPage/>}/>
     <Route path="/login" element={<Login/>} />
      <Route path="/result" element={<ResultPage/>} />
     <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
};


export default App;
