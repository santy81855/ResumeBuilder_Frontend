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

    const handleDropdownClick = () => {
        setIsDropdownClicked(!isDropdownClicked);
    };
    const HAMBURGER_WIDTH = 450;

    /*
    const handleLogout = () => {
        // fetch user information using token and set it to user
        fetch("http://myhost.com:3000/auth/logout")
            .then((response) => {
                if (response.ok) {
                    console.log("Logged out successfully");
                    alert("hey");
                } else {
                    throw new Error("Failed to log out");
                }
            })
            .catch((error) => console.error(error));
        window.location.href = "/login";
        logout();
    };
*/
    useEffect(() => {
        function handleResize() {
            const horMenu = document.getElementsByClassName("Header-right")[0];
            const vertMenu = document.getElementsByClassName(
                "Header-right-vertical"
            )[0];
            const hamMenu =
                document.getElementsByClassName("Header-hamburger")[0];
            if (window.innerWidth < HAMBURGER_WIDTH && isHamburgerClicked) {
                showElement(vertMenu);
                showElement(hamMenu);
                hideElement(horMenu);
            } else if (
                window.innerWidth < HAMBURGER_WIDTH &&
                !isHamburgerClicked
            ) {
                showElement(hamMenu);
                hideElement(horMenu);
                hideElement(vertMenu);
            } else if (window.innerWidth >= HAMBURGER_WIDTH) {
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

    //********************************************//
    const logoutQuery = useQuery({
        queryKey: ["logoutUser"],
        queryFn: logoutUser,
        onSuccess: (data, variables, context) => {
            console.log("Logged out successfully");
            window.location.href = "/login";
            logout();
        },
        onError: (error, variables, context) => {
            console.log("Error logging out");
            console.log(error);
        },
        enabled: false,
    });

    const handleUserLogout = () => {
        logoutQuery.refetch({});
    };
    //********************************************//

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
                <a>
                    <img
                        className="Header-account"
                        src={accountIcon}
                        alt="account"
                        onClick={handleDropdownClick}
                    />
                    {isDropdownClicked && (
                        <div className="Header-account-dropdown">
                            <a href="/account">Account</a>
                            <a href="/u/resumes">Resumes</a>
                            <a href="/settings">Settings</a>
                            <a onClick={handleUserLogout}>Logout</a>
                        </div>
                    )}
                </a>
            );
        } else {
            return <a href="/login">Log In</a>;
        }
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
                {renderAuthButton()}
                <a href="/">Home</a>
                <a href="/about">About</a>
            </div>
        </div>
    );
});

export default Header;
