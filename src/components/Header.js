import React, { useEffect, useState } from "react";
import logo from "../images/AEyeLogo.png";
import accountIcon from "../images/account-pics/option3.png";
import "../styles/Header.css";
import { observer } from "mobx-react-lite";
import { store, logout, initialize } from "../store";
import { useQuery, useMutation } from "@tanstack/react-query";
import { logoutUser } from "../api/user/UserRequests";

const Header = observer(() => {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);
    const [isDropdownClicked, setIsDropdownClicked] = useState(false);
    const [shortNav, setShortNav] = useState(false);
    const [showVerticalMenu, setShowVerticalMenu] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(
        localStorage.getItem("token") ? true : false
    );

    const HAMBURGER_WIDTH = 480;

    useEffect(() => {
        if (window.innerWidth < HAMBURGER_WIDTH) {
            setShortNav(true);
        }
        function handleResize() {
            if (window.innerWidth < HAMBURGER_WIDTH) {
                setShortNav(true);
            } else {
                setShortNav(false);
            }
        }

        window.addEventListener("resize", handleResize);

        // Clean up event listener when component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [shortNav]);

    const logoutQuery = useQuery({
        queryKey: ["logoutUser"],
        queryFn: logoutUser,
        onSuccess: (data, variables, context) => {
            window.location.href = "/login";
            logout();
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
        enabled: false,
    });

    const handleUserLogout = () => {
        logoutQuery.refetch({});
    };

    const logoElement = (
        <div className="Header-left">
            <img src={logo} className="Header-logo" alt="logo" />
            <span className="Header-app-name">Ai Resume</span>
        </div>
    );

    const navMenuElement = (
        <nav className="Header-right">
            <a className="Nav-link" href="/">
                Home
            </a>
            {isUserLoggedIn ? (
                <a className="Nav-link" href="/u/resumes">
                    Dashboard
                </a>
            ) : (
                <a className="Nav-link" href="/login">
                    Login
                </a>
            )}
        </nav>
    );

    const toggleMenu = () => {
        const element = document.getElementById("verticalMenu");

        if (!showVerticalMenu) {
            if (element) {
                element.classList.remove("slideout");
                element.classList.add("slidein");
                setShowVerticalMenu(true);
            }
        } else {
            element.classList.remove("slidein");
            element.classList.add("slideout");
            setShowVerticalMenu(false);
        }
    };

    const menuButton = (
        <button className="Header-hamburger" onClick={toggleMenu}>
            &#9776;
        </button>
    );

    const verticalMenu = (
        <div className="Header-right-vertical" id="verticalMenu">
            <div className="menu-options">
                <a href="/">Home</a>
                {localStorage.getItem("token") ? (
                    <a href="/u/resumes">Dashboard</a>
                ) : (
                    <a href="/login">Login</a>
                )}
                {localStorage.getItem("token") && (
                    <a onClick={handleUserLogout}>Logout</a>
                )}
            </div>
        </div>
    );

    return (
        <header className="Header">
            <div className="navbar">
                {logoElement}
                {!shortNav && navMenuElement}
                {(isUserLoggedIn || shortNav) && menuButton}
                {verticalMenu}
            </div>
        </header>
    );
});

export default Header;
