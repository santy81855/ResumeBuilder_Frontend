import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/api/test")
            .then((response) => response.json())
            .then((data) => setMessage(data.message))
            .catch((error) => console.error(error));
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                {/* add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;
