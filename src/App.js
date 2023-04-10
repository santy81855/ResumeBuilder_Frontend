import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";

function App() {
    const [message, setMessage] = useState("");

    return (
        <div>
            <Router>
                <Header />
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/create-account" element={<CreateAccount />} />
                    {/* add other routes here */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
