import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AddLC from "./components/AddLC";

import LC from "./components/LC";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ContactUs from "./components/ContactUs";
import DataTable from "./components/DataTable";
import LCList from "./components/LCList";
import EditLC from "./components/EditLC";
import BootstrapTable from "./components/BootstrapTable";


const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/lc/all" className="navbar-brand">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trade Finance Import Letter of Credit
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item" >
            <Link to={"/"} className="nav-link">
              Log Out
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/contactus" element={<ContactUs/>} />
          <Route path="/lc/all" element={<LCList/>} />
          <Route path="/add" element={<AddLC/>} />
          <Route path="/lc/update/:lcRefId" element={<EditLC/>} />
          <Route path="/data" element={<DataTable/>} />
          <Route path="/data2" element={<BootstrapTable/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;