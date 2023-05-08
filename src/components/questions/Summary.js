import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const Summary = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [summary, setSummary] = useState(resumeData.summary);
    const summaryRef = useRef();

    // update resumeData useState variable everytime textbox is edited
    const handleSummaryChange = (event) => {
        const value = summaryRef.current.value;
        setSummary(value);
        setResumeData({
            ...resumeData,
            summary: value,
        });
    };

    return (
        <div className="question-container">
            <h2>Summary</h2>
            <h3>
                Describe your work experience, skills, and achievements in a
                concise and informative manner in this section.
            </h3>
            <p>
                This section should highlight your unique value proposition as a
                candidate and grab the attention of the hiring manager.
            </p>
            <div className="long-input-container">
                <textarea
                    ref={summaryRef}
                    className="long-input summary"
                    placeholder="+ Write your summary here."
                    type="text"
                    name="summary"
                    value={summary}
                    onChange={(event) => {
                        setSummary(event.target.value);
                        handleSummaryChange(event);
                    }}
                    rows="10"
                />
            </div>
            <div className="question-container-button-container">
                <button
                    className="question-container-close-button"
                    onClick={closeModal}
                >
                    Close
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : "apply"}
                </button>
            </div>
            <button className="close-modal-button" onClick={closeModal}>
                x
            </button>
        </div>
    );
};

export default Summary;
