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

import { Navigate } from "react-router-dom";

import resumeData from "./resume-schema.json";

import SantyAndAlaine from "./components/SantyAndAlaine";

function App() {
    return (
        <body>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />{" "}
                    {/* add the new route for Home */}
                    <Route
                        path="/login"
                        element={
                            localStorage.getItem("token") ? (
                                <Navigate to="/" replace={true} />
                            ) : (
                                <LoginForm />
                            )
                        }
                    />
                    <Route
                        path="/create-account"
                        element={
                            localStorage.getItem("token") ? (
                                <Navigate to="/" replace={true} />
                            ) : (
                                <CreateAccount />
                            )
                        }
                    />
                    <Route
                        path="/u/resumes"
                        element={
                            localStorage.getItem("token") ? (
                                <ResumePage />
                            ) : (
                                <Navigate to="/login" replace={true} />
                            )
                        }
                    />
                    <Route
                        path="/u/create-resume/:routeResumeTitle/:routeResumeJob/:routeResumeDescription"
                        element={
                            localStorage.getItem("token") ? (
                                <CreateResume />
                            ) : (
                                <Navigate to="/login" replace={true} />
                            )
                        }
                    />
                    <Route
                        path="/u/edit-resume/"
                        element={
                            localStorage.getItem("token") ? (
                                <CreateResume />
                            ) : (
                                <Navigate to="/login" replace={true} />
                            )
                        }
                    />
                    <Route
                        path="santy-and-alaine"
                        element={<SantyAndAlaine />}
                    />
                    {/* add other routes here */}
                </Routes>
            </Router>
        </body>
    );
}

export default App;
