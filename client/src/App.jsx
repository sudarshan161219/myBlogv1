import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Post from "./components/post";
import IndexPage from "./pages/IndexPage";
import Nav from "./components/nav";
import Login from "./components/login";
import Register from "./components/register";
import Layout from "./components/Layout";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
     <ToastContainer />
      <Nav />
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
