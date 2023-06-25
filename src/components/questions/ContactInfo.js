import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const ContactInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [email, setEmail] = useState(resumeData.contact.email);
    const [phone, setPhone] = useState(resumeData.contact.phone);
    const [website, setWebsite] = useState(resumeData.contact.website);

    const emailRef = useRef();
    const phoneRef = useRef();
    const websiteRef = useRef();

    // update resumeData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "email":
                var value = emailRef.current.value;
                setEmail(value);
                setResumeData({
                    ...resumeData,
                    contact: {
                        ...resumeData.contact,
                        email: value,
                    },
                });
                return;
            case "phone":
                var value = phoneRef.current.value;
                setPhone(value);
                setResumeData({
                    ...resumeData,
                    contact: {
                        ...resumeData.contact,
                        phone: value,
                    },
                });
                return;
            case "website":
                var value = websiteRef.current.value;
                setWebsite(value);
                setResumeData({
                    ...resumeData,
                    contact: {
                        ...resumeData.contact,
                        website: value,
                    },
                });
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Contact Information</h2>
                <h3>
                    Write the contact information you want to show on your
                    resume.
                </h3>
                <p>
                    A well-presented and comprehensive contact information
                    section on a resume enhances your chances of being contacted
                    for job interviews or further discussions about potential
                    employment
                </p>
            </div>
            <div className="input-container-horizontal">
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

export default ContactInfo;
