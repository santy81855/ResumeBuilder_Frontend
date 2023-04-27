import React, { useState, useEffect } from "react";
import "../../styles/questions/BasicInfo.css";

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
    const [summary, setSummary] = useState("lorem ipsum");

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
        } else if (name === "summary") {
            setSummary(value);
            onResumeDataChange({
                ...resumeData,
                basics: { ...resumeData.basics, summary: value },
            });
        }
    };

    const handleNextClick = () => {
        handleNext(personName);
    };

    return (
        <div className="question-container">
            <h2>Basic Information</h2>
            <div className="basic-info-input">
                <div className="short-input-container">
                    <h3>Name:</h3>
                    <input
                        className="short-input"
                        type="text"
                        name="name"
                        value={personName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="short-input-container">
                    <h3>Email:</h3>
                    <input
                        className="short-input"
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="short-input-container">
                    <h3>Phone:</h3>
                    <input
                        className="short-input"
                        type="text"
                        name="phone"
                        value={phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="short-input-container">
                    <h3>Website:</h3>
                    <input
                        className="short-input"
                        type="text"
                        name="website"
                        value={website}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="short-input-container">
                    <h3>Summary:</h3>
                    <textarea
                        className="long-input"
                        type="text"
                        name="summary"
                        value={summary}
                        onChange={handleInputChange}
                        rows="5"
                    />
                </div>
            </div>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default BasicInfo;
