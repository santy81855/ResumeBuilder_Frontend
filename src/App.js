import "./App.css";
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import CreateAccount from "./components/CreateAccount";
import Home from "./components/Home"; // import the Home component
import ResumePage from "./components/ResumePage";
import CreateResume from "./components/CreateResume";
import CreateLetter from "./components/CreateLetter";
import { Navigate } from "react-router-dom";
import Modal from "react-modal";
import Completion from "./components/Completion";
import AccountPage from "./components/AccountPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CookiePolicy from "./components/CookiePolicy";
import Terms from "./components/Terms";
import { AppStateProvider } from "./AppStateContext";
import i18n from "./i18n"; // Import your i18n configuration

function App() {
    Modal.setAppElement("#root"); // Assuming "#root" is the ID of the root element of your application.
    const [websiteLanguage, setWebsiteLanguage] = useState("en");

    useEffect(() => {
        const doc = document.documentElement;
        doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
        function handleResize() {
            const doc = document.documentElement;
            doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
        }
        window.addEventListener("resize", handleResize);
        // Clean up event listener when component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        i18n.changeLanguage(websiteLanguage);
    }, [websiteLanguage]);

    return (
        <>
            <AppStateProvider>
                <Router>
                    <Header setWebsiteLanguage={setWebsiteLanguage} />
                    <Routes>
                        <Route
                            path="/privacy-policy"
                            element={<PrivacyPolicy />}
                        />
                        <Route
                            path="/cookie-policy"
                            element={<CookiePolicy />}
                        />
                        <Route
                            path="/terms-and-conditions"
                            element={<Terms />}
                        />
                        <Route path="/" element={<Home />} />
                        <Route path="/account" element={<AccountPage />} />
                        <Route path="/completion" element={<Completion />} />
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
                            path="/u/create-cover-letter/:routeLetterTitle/:routeLetterJob/:routeLetterDescription"
                            element={
                                localStorage.getItem("token") ? (
                                    <CreateLetter />
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
                            path="/u/edit-cover-letter/"
                            element={
                                localStorage.getItem("token") ? (
                                    <CreateLetter />
                                ) : (
                                    <Navigate to="/login" replace={true} />
                                )
                            }
                        />
                    </Routes>
                </Router>
            </AppStateProvider>
        </>
    );
}

export default App;
