import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const Greeting = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [greeting, setGreeting] = useState(letterData.opener);
    const [recipient, setRecipient] = useState(letterData.openerName);

    const greetingRef = useRef();
    const recipientRef = useRef();
    // update letterData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "greeting":
                var value = greetingRef.current.value;
                setGreeting(value);
                setLetterData({
                    ...letterData,
                    opener: value,
                });
                return;
            case "recipient":
                var value = recipientRef.current.value;
                setRecipient(value);
                setLetterData({
                    ...letterData,
                    openerName: value,
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Letter Greeting</h2>
                <h3>
                    Customize the greeting of your cover letter to the hiring
                    manager or recruiter you are sending it to.
                </h3>
                <p>
                    Alternating greetings like "Dear Hiring Manager" or "To the
                    [job title]" personalizes the letter when the recipient's
                    name is unknown, displaying adaptability and respect for
                    diverse roles within the company.
                </p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>Greeting</p>
                    <input
                        id="greeting"
                        ref={greetingRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={greeting}
                    ></input>
                </div>
                <div className="input-item">
                    <p>Recipient</p>
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

export default Greeting;
