import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useTranslation, Trans } from "react-i18next";

const Contact = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const { i18n, t } = useTranslation();
    const [name, setName] = useState(letterData.from);
    const [email, setEmail] = useState(letterData.email);
    const [phone, setPhone] = useState(letterData.phone);
    const [website, setWebsite] = useState(letterData.website);
    const [location, setLocation] = useState(letterData.location);
    const [position, setPosition] = useState(letterData.position);

    const emailRef = useRef();
    const phoneRef = useRef();
    const websiteRef = useRef();
    const nameRef = useRef();
    const locationRef = useRef();
    const positionRef = useRef();

    // update letterData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "name":
                var value = nameRef.current.value;
                setName(value);
                setLetterData({
                    ...letterData,
                    from: value,
                });
                return;
            case "email":
                var value = emailRef.current.value;
                setEmail(value);
                setLetterData({
                    ...letterData,
                    email: value,
                });
                return;
            case "phone":
                var value = phoneRef.current.value;
                setPhone(value);
                setLetterData({
                    ...letterData,
                    phone: value,
                });
                return;
            case "website":
                var value = websiteRef.current.value;
                setWebsite(value);
                setLetterData({
                    ...letterData,
                    website: value,
                });
                return;
            case "location":
                var value = locationRef.current.value;
                setLocation(value);
                setLetterData({
                    ...letterData,
                    location: value,
                });
                return;
            case "position":
                var value = positionRef.current.value;
                setPosition(value);
                setLetterData({
                    ...letterData,
                    position: value,
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("letterContact.title")}</h2>
                <h3>{t("letterContact.description1")}</h3>
                <p>{t("letterContact.description2")}</p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>{t("letterContact.name")}</p>
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
                    <p>{t("letterContact.email")}</p>
                    <input
                        id="email"
                        ref={emailRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={email}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterContact.phone")}</p>
                    <input
                        id="phone"
                        ref={phoneRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={phone}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterContact.website")}</p>
                    <input
                        id="website"
                        ref={websiteRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={website}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterContact.position")}</p>
                    <input
                        id="position"
                        ref={positionRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={position}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterContact.location")}</p>
                    <input
                        id="location"
                        ref={locationRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={location}
                    ></input>
                </div>
            </div>
            <div className="question-container-button-container">
                <button
                    className="question-container-close-button"
                    onClick={closeModal}
                >
                    {t("letterContact.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("letterContact.apply")}
                </button>
            </div>
        </div>
    );
};

export default Contact;
