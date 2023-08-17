import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useTranslation, Trans } from "react-i18next";

const TitleInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const { i18n, t } = useTranslation();
    const [name, setName] = useState(resumeData.contact.name);
    const [label, setLabel] = useState(resumeData.label);

    const nameRef = useRef();
    const labelRef = useRef();
    // update resumeData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "name":
                var value = nameRef.current.value;
                setName(value);
                setResumeData({
                    ...resumeData,
                    contact: {
                        ...resumeData.contact,
                        name: value,
                    },
                });
                return;
            case "label":
                var value = labelRef.current.value;
                setLabel(value);
                setResumeData({
                    ...resumeData,
                    label: value,
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("resumeTitleInfo.title")}</h2>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>{t("resumeTitleInfo.name")}</p>
                    <input
                        id="name"
                        ref={nameRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={name}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("resumeTitleInfo.label")}</p>
                    <input
                        id="label"
                        ref={labelRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={label}
                    ></input>
                </div>
            </div>
            <div className="question-container-button-container">
                <button
                    className="question-container-close-button"
                    onClick={closeModal}
                >
                    {t("resumeTitleInfo.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("resumeTitleInfo.apply")}
                </button>
            </div>
        </div>
    );
};

export default TitleInfo;
