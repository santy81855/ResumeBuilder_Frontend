import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useTranslation, Trans } from "react-i18next";

const Closer = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const { i18n, t } = useTranslation();
    const [closer, setCloser] = useState(letterData.closer);
    const [recipient, setRecipient] = useState(letterData.closerName);

    const closerRef = useRef();
    const recipientRef = useRef();
    // update letterData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "closer":
                var value = closerRef.current.value;
                setCloser(value);
                setLetterData({
                    ...letterData,
                    closer: value,
                });
                return;
            case "recipient":
                var value = recipientRef.current.value;
                setRecipient(value);
                setLetterData({
                    ...letterData,
                    closerName: value,
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("letterCloser.title")}</h2>
                <h3>{t("letterCloser.description1")}</h3>
                <p>{t("letterCloser.description2")}</p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>{t("letterCloser.greeting")}</p>
                    <input
                        id="closer"
                        ref={closerRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={closer}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterCloser.recipient")}</p>
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
                    {t("letterCloser.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("letterCloser.apply")}
                </button>
            </div>
        </div>
    );
};

export default Closer;
