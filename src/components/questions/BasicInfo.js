import React, { useState, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";

/*
Basic info takes input of the following fields:
- name
- email
- phone-number
- website
- summary
*/

const BasicInfo = ({ resumeData, handleNext, onResumeDataChange }) => {
    const [personName, setPersonName] = useState("John Doe");
    const [email, setEmail] = useState("JohnDoe@example.com");
    const [phone, setPhone] = useState("(123) 456-7890");
    const [website, setWebsite] = useState("johndoe.com");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
            setPersonName(value);
            onResumeDataChange({
                ...resumeData,
                basics: { ...resumeData.basics, name: value },
            });
        } else if (name === "email") {
            setEmail(value);
            onResumeDataChange({
                ...resumeData,
                basics: { ...resumeData.basics, email: value },
            });
        } else if (name === "phone") {
            setPhone(value);
            onResumeDataChange({
                ...resumeData,
                basics: { ...resumeData.basics, phone: value },
            });
        } else if (name === "website") {
            setWebsite(value);
            onResumeDataChange({
                ...resumeData,
                basics: { ...resumeData.basics, website: value },
            });
        }
    };

    const handleNextClick = () => {
        handleNext(personName);
    };

    return (
        <div className="question-container">
            <h2>Header</h2>
            <div className="basic-info-input">
                <div className="input-container">
                    <h3>Name:</h3>
                    <input
                        className="short-input"
                        type="text"
                        name="name"
                        value={personName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container">
                    <h3>Email:</h3>
                    <input
                        className="short-input"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container">
                    <h3>Phone:</h3>
                    <input
                        className="short-input"
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input-container">
                    <h3>Website:</h3>
                    <input
                        className="short-input"
                        type="text"
                        name="website"
                        value={website}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default BasicInfo;
