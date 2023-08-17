import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation, Trans } from "react-i18next";

const Header = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
    template,
}) => {
    const { i18n, t } = useTranslation();
    const [name, setName] = useState(letterData.from);
    const [email, setEmail] = useState(letterData.email);
    const [phone, setPhone] = useState(letterData.phone);
    const [website, setWebsite] = useState(letterData.website);

    const [date, setDate] = useState(letterData.date);
    const [company, setCompany] = useState(letterData.companyName);
    const [addressTitle, setAddressTitle] = useState(letterData.toAddressTitle);
    const [addressLine1, setAddressLine1] = useState(letterData.toAddressLine1);
    const [addressLine2, setAddressLine2] = useState(letterData.toAddressLine2);
    const [addressLine3, setAddressLine3] = useState(letterData.toAddressLine3);

    const dateRef = useRef();
    const companyRef = useRef();
    const addressTitleRef = useRef();
    const addressLine1Ref = useRef();
    const addressLine2Ref = useRef();
    const addressLine3Ref = useRef();

    // update letterData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "date":
                var value = dateRef.current.value;
                setDate(value);
                setLetterData({
                    ...letterData,
                    date: value,
                });
                return;
            case "company":
                var value = companyRef.current.value;
                setCompany(value);
                setLetterData({
                    ...letterData,
                    companyName: value,
                });
                return;
            case "addressTitle":
                var value = addressTitleRef.current.value;
                setAddressTitle(value);
                setLetterData({
                    ...letterData,
                    toAddressTitle: value,
                });
                return;
            case "addressLine1":
                var value = addressLine1Ref.current.value;
                setAddressLine1(value);
                setLetterData({
                    ...letterData,
                    toAddressLine1: value,
                });
                return;
            case "addressLine2":
                var value = addressLine2Ref.current.value;
                setAddressLine2(value);
                setLetterData({
                    ...letterData,
                    toAddressLine2: value,
                });
                return;
            case "addressLine3":
                var value = addressLine3Ref.current.value;
                setAddressLine3(value);
                setLetterData({
                    ...letterData,
                    toAddressLine3: value,
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("letterHeader.title")}</h2>
                <h3>{t("letterHeader.description1")}</h3>
                <p>{t("letterHeader.description2")}</p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>{t("letterHeader.date")}</p>
                    <input
                        id="date"
                        ref={dateRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={date}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterHeader.company")}</p>
                    <input
                        id="company"
                        ref={companyRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={company}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterHeader.addressTitle")}</p>
                    <input
                        id="addressTitle"
                        ref={addressTitleRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={addressTitle}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("letterHeader.address1")}</p>
                    <input
                        id="addressLine1"
                        ref={addressLine1Ref}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={addressLine1}
                    ></input>
                </div>

                <div className="input-item">
                    <p>{t("letterHeader.address2")}</p>
                    <input
                        id="addressLine2"
                        ref={addressLine2Ref}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={addressLine2}
                    ></input>
                </div>

                <div className="input-item">
                    <p>{t("letterHeader.address3")}</p>
                    <input
                        id="addressLine3"
                        ref={addressLine3Ref}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={addressLine3}
                    ></input>
                </div>
            </div>
            <div className="question-container-button-container">
                <button
                    className="question-container-close-button"
                    onClick={closeModal}
                >
                    {t("letterHeader.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("letterHeader.apply")}
                </button>
            </div>
        </div>
    );
};

export default Header;
