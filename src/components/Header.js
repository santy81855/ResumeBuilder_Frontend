import React from "react";
import logo from "../images/logo.png";
import "../styles/Header.css";
import { observer } from "mobx-react-lite";
import { store, login, logout } from "../store";

const Header = observer(() => {
    const renderAuthButton = () => {
        if (store.isLoggedIn) {
            return <button onClick={handleLogout}>Log out</button>;
        } else {
            return <a href="/login">Log In/Sign Up</a>;
        }
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="Header">
            <div className="Header-left">
                <img src={logo} className="Header-logo" alt="logo" />
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
