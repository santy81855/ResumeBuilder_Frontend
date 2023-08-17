import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useTranslation, Trans } from "react-i18next";

const Greeting = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const { i18n, t } = useTranslation();
    const [greeting, setGreeting] = useState(letterData.opener);
    const [recipient, setRecipient] = useState(letterData.openerName);

    const greetingRef = useRef();
    const recipientRef = useRef();
    // update letterData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "greeting":
                var value = greetingRef.current.value;
                setGreeting(value);
                setLetterData({
                    ...letterData,
                    opener: value,
                });
                return;
            case "recipient":
                var value = recipientRef.current.value;
                setRecipient(value);
                setLetterData({
                    ...letterData,
                    openerName: value,
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("letterGreeting.title")}</h2>
                <h3>{t("letterGreeting.description1")}</h3>
                <p>{t("letterGreeting.description2")}</p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>{t("letterGreeting.greeting")}</p>
                    <input
                        id="greeting"
                        ref={greetingRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={greeting}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterGreeting.recipient")}</p>
                    <input
                        id="recipient"
                        ref={recipientRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={recipient}
                    ></input>
                </div>
            </div>
            <div className="question-container-button-container">
                <button
                    className="question-container-close-button"
                    onClick={closeModal}
                >
                    {t("letterGreeting.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("letterGreeting.apply")}
                </button>
            </div>
        </div>
    );
};

export default Greeting;
