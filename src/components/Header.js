import React, { useEffect, useState } from "react";
import logo from "../images/AEyeLogo.png";
import "../styles/Header.css";
import { observer } from "mobx-react-lite";
import { store, logout, initialize } from "../store";

const Header = observer(() => {
    const [isHamburgerClicked, setIsHamburgerClicked] = useState(false);

    useEffect(() => {
        function handleResize() {
            const horMenu = document.getElementsByClassName("Header-right")[0];
            const vertMenu = document.getElementsByClassName(
                "Header-right-vertical"
            )[0];
            const hamMenu =
                document.getElementsByClassName("Header-hamburger")[0];
            if (window.innerWidth < 400 && isHamburgerClicked) {
                showElement(vertMenu);
                showElement(hamMenu);
                hideElement(horMenu);
            } else if (window.innerWidth < 400 && !isHamburgerClicked) {
                showElement(hamMenu);
                hideElement(horMenu);
                hideElement(vertMenu);
            } else if (window.innerWidth >= 400) {
                setIsHamburgerClicked(false);
                showElement(horMenu);
                hideElement(hamMenu);
                hideElement(vertMenu);
            }
        }

        window.addEventListener("resize", handleResize);

        // Clean up event listener when component is unmounted
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const hideElement = (element) => {
        element.style.display = "none";
    };

    const showElement = (element) => {
        element.style.display = "flex";
    };

    const renderAuthButton = () => {
        const token = localStorage.getItem("token");
        if (token) {
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
        fetch("http://myhost.com:3000/auth/logout")
            .then((response) => {
                if (response.ok) {
                    console.log("Logged out successfully");
                } else {
                    throw new Error("Failed to log out");
                }
            })
            .catch((error) => console.error(error));
        window.location.href = "/login";
        logout();
    };

    const handleMenuClick = () => {
        const vertMenu = document.getElementsByClassName(
            "Header-right-vertical"
        )[0];
        if (isHamburgerClicked == false) {
            setIsHamburgerClicked(true);
            showElement(vertMenu);
        } else {
            setIsHamburgerClicked(false);
            hideElement(vertMenu);
        }
    };

    return (
        <div className="Header">
            <div className="Header-left">
                <img src={logo} className="Header-logo" alt="logo" />
                <span className="Header-app-name">Ai Resume</span>
            </div>
            <div className="Header-hamburger" onClick={handleMenuClick}>
                &#9776;
            </div>
            <div className="Header-right">
                <a href="/">Home</a>
                <a href="/about">About</a>
                {renderAuthButton()}
            </div>
            <div className="Header-right-vertical">
                <a href="/">Home</a>
                <a href="/about">About</a>
                {renderAuthButton()}
            </div>
        </div>
    );
});

export default Header;
