import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const Closer = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [closer, setCloser] = useState(letterData.closer);
    const [recipient, setRecipient] = useState(letterData.closerName);

    const closerRef = useRef();
    const recipientRef = useRef();
    // update letterData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "closer":
                var value = closerRef.current.value;
                setCloser(value);
                setLetterData({
                    ...letterData,
                    closer: value,
                });
                return;
            case "recipient":
                var value = recipientRef.current.value;
                setRecipient(value);
                setLetterData({
                    ...letterData,
                    closerName: value,
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Complimentary Close</h2>
                <h3>
                    Alternating complimentary closers, such as "sincerely" and
                    "regards," keeps the tone fresh, indicates flexibility, and
                    adapts to various recipient relationships, maintaining a
                    dynamic and engaging communication style.
                </h3>
                <p>
                    Using a complimentary close, like "sincerely," adds a polite
                    and professional touch to a letter, concluding it with a
                    respectful tone and leaving a positive impression.
                </p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>Greeting</p>
                    <input
                        id="closer"
                        ref={closerRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={closer}
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

export default Closer;
