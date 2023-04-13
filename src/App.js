import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";
import Home from "./components/Home"; // import the Home component
import ResumeEditor from "./components/ResumeEditor";
import BasicTemplate from "./components/templates/BasicTemplate";

function App() {
    const [message, setMessage] = useState("");

    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />{" "}
                    {/* add the new route for Home */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    <Route path="/edit-resume" element={<ResumeEditor />} />
                    <Route
                        path="/templates/basic"
                        element={<BasicTemplate />}
                    />
                    {/* add other routes here */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
