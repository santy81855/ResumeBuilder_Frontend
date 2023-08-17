import React, { useEffect, useState } from "react";
import logo from "../images/AEyeLogo.png";
import accountIcon from "../images/account-pics/option3.png";
import "../styles/Header.css";
import { observer } from "mobx-react-lite";
import { store, logout, initialize } from "../store";
import { useQuery, useMutation } from "@tanstack/react-query";
import { logoutUser, updateUser } from "../api/user/UserRequests";
import { useAppState } from "../AppStateContext";
import { useTranslation, Trans } from "react-i18next";

const Header = observer(({ setWebsiteLanguage }) => {
    const { i18n, t } = useTranslation();
    // access the language state
    const { appState, setAppState } = useAppState();
    const [selectedOption, setSelectedOption] = useState(appState.language); // State to track selected option
    const [shortNav, setShortNav] = useState(false);
    const [showVerticalMenu, setShowVerticalMenu] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(
        localStorage.getItem("token") ? true : false
    );

    const HAMBURGER_WIDTH = 650;

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

    useEffect(() => {
        setSelectedOption(appState.language);
        setWebsiteLanguage(languageToCode[appState.language]);
    }, [appState]);

    const languageToCode = {
        English: "en",
        Spanish: "es",
        French: "fr",
        German: "de",
        Italian: "it",
        Portuguese: "pt",
        Japanese: "ja",
        Korean: "ko",
        Chinese: "zh",
        Russian: "ru",
    };

    const supportedLanguages = [
        { name: "English" },
        { name: "Spanish" },
        { name: "French" },
        { name: "German" },
        { name: "Italian" },
        { name: "Portuguese" },
        { name: "Japanese" },
        { name: "Korean" },
        { name: "Chinese" },
        { name: "Russian" },
    ];
    const updateUserMutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data, variables, context) => {},
        onError: (error, variables, context) => {
            alert("Error changing language.");
        },
    });

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
                {t("header.home")}
            </a>
            {isUserLoggedIn ? (
                <>
                    <a className="Nav-link" href="/u/resumes">
                        {t("header.dashboard")}
                    </a>
                    <a className="Nav-link" href="/account">
                        {t("header.account")}
                    </a>
                </>
            ) : (
                <a className="Nav-link" href="/login">
                    {t("header.login")}
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

    const LanguageDropdown = () => {
        return (
            <div className="drop-down-container">
                <select
                    className="drop-down"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value="">{t("header.languageSelect")}</option>
                    {supportedLanguages.map((language) => (
                        <option key={language.name} value={language.name}>
                            {language.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const verticalMenu = (
        <div className="Header-right-vertical" id="verticalMenu">
            <div className="menu-options">
                <a href="/">{t("header.home")}</a>
                {localStorage.getItem("token") ? (
                    <>
                        <a href="/u/resumes">{t("header.dashboard")}</a>
                        <a href="/account">{t("header.account")}</a>
                    </>
                ) : (
                    <a href="/login">{t("header.login")}</a>
                )}
                {localStorage.getItem("token") && (
                    <a onClick={handleUserLogout}>{t("header.logout")}</a>
                )}
                <LanguageDropdown />
            </div>
        </div>
    );

    const handleSelectChange = (event) => {
        const language = event.target.value;
        setSelectedOption(language);
        // if the user changed the language
        if (language !== "") {
            setAppState({ ...appState, language: language });
            updateUserMutation.mutate({
                language: language,
            });
        }
    };

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
