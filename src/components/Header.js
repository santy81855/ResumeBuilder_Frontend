import React from "react";
import logo from "../images/logo.png";
import "../styles/Header.css";
import { observer } from "mobx-react-lite";
import { store, logout, initialize } from "../store";

const Header = observer(() => {
    const renderAuthButton = () => {
        initialize();
        if (store.isLoggedIn) {
            return (
                <a className="Header-logout">
                    <button onClick={handleLogout}>Logout</button>
                </a>
            );
        } else {
            return <a href="/login">Log In</a>;
        }
    };

    const handleLogout = () => {
        // fetch user information using token and set it to user
        fetch("http://localhost:3000/auth/logout")
            .then((response) => {
                if (response.ok) {
                    console.log("Logged out successfully");
                } else {
                    throw new Error("Failed to log out");
                }
            })
            .catch((error) => console.error(error));

        logout();
    };

    return (
        <div className="Header">
            <div className="Header-left">
                <img src={logo} className="Header-logo" alt="logo" />
                <span className="Header-app-name">Ai Resume</span>
            </div>
            <div className="Header-right">
                <a href="/">Home</a>
                <a href="/about">About</a>
                {renderAuthButton()}
            </div>
        </div>
    );
});

export default Header;
