import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const Contact = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
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
                <h2>Contact Information</h2>
                <h3>
                    Write the contact information you want to show on your cover
                    letter.
                </h3>
                <p>
                    A well-presented and comprehensive contact information
                    section on a cover letter enhances your chances of being
                    contacted for job interviews or further discussions about
                    potential employment
                </p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>Name</p>
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
                    <p>Email</p>
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
                    <p>Phone</p>
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
                    <p>Website</p>
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
                    <p>Position</p>
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
                    <p>Location</p>
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

export default Contact;
