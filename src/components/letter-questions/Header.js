import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Header = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
    template,
}) => {
    const [name, setName] = useState(letterData.from);
    const [email, setEmail] = useState(letterData.email);
    const [phone, setPhone] = useState(letterData.phone);
    const [website, setWebsite] = useState(letterData.website);

    const [date, setDate] = useState();
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
                console.log(dateRef.current);
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
                <h2>Company Information</h2>
                <h3>
                    Write the company information you want to show on your cover
                    letter.
                </h3>
                <p>
                    Including the date, company name, and address adds
                    professionalism, shows attention to detail, and tailors the
                    cover letter, demonstrating genuine interest in the specific
                    company and position.
                </p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>Start Date</p>
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
                    <p>Company Name</p>
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
                    <p>Address Title</p>
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
                    <p>Address Line 1</p>
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
                    <p>Address Line 2</p>
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
                    <p>Address Line 3</p>
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
                    Back
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : "apply"}
                </button>
            </div>
        </div>
    );
};

export default Header;
