import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Post from "./components/post";
import IndexPage from "./pages/IndexPage";
import Nav from "./components/nav";
import Login from "./components/login";
import Register from "./components/register";
import Layout from "./components/Layout";
import CreatNewPost from "./pages/CreatNewPost";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from "./context/UserContex";

const App = () => {
  return (
    <>
    <UserContextProvider>
     <ToastContainer />
      <Nav />
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/create' element={< CreatNewPost/>} />
      </Routes>
      </UserContextProvider>
    </>
  );
};

export default App;
