import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Post from "./components/post";
import IndexPage from "./pages/IndexPage";
import Nav from "./components/nav";
import Login from "./components/login";
import Register from "./components/register";
import Layout from "./components/Layout";
const App = () => {
  return (
    <>
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
