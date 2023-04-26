import React, { useState } from "react";
import "../../styles/questions/BasicInfo.css";

/*
Basic info takes input of the following fields:
- name
- email
- phone-number
- website
- summary
*/

const BasicInfo = ({ handleNext }) => {
    const [personName, setPersonName] = useState("John Doe");
    const [email, setEmail] = useState("JohnDoe@example.com");

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "name") {
            setPersonName(value);
        } else if (name === "email") {
            setEmail(value);
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
            </div>
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default BasicInfo;
