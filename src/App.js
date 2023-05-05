import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";
import Home from "./components/Home"; // import the Home component
import ResumePage from "./components/ResumePage";
import CreateResume from "./components/CreateResume";
import CleanTemplate from "./components/templates/CleanTemplate";

import resumeData from "./resume-schema.json";

import SantyAndAlaine from "./components/SantyAndAlaine";

function App() {
    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />{" "}
                    {/* add the new route for Home */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route
                        path="/templates/clean"
                        element={<CleanTemplate resumeData={resumeData} />}
                    />
                    <Route path="/u/resumes" element={<ResumePage />} />
                    <Route path="/u/create-resume" element={<CreateResume />} />
                    <Route path="/u/edit-resume" element={<CreateResume />} />
                    <Route
                        path="santy-and-alaine"
                        element={<SantyAndAlaine />}
                    />
                    {/* add other routes here */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
