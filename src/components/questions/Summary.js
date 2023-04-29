import React, { useState } from "react";
import "../../styles/questions/ResumeInput.css";

const Summary = ({ resumeData, onResumeDataChange, closeModal }) => {
    const [summary, setSummary] = useState("");

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSummary(value);
        onResumeDataChange({
            ...resumeData,
            basics: { ...resumeData.basics, summary: value },
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
                    className="long-input summary"
                    placeholder="+ Write your summary here."
                    type="text"
                    name="summary"
                    value={summary}
                    onChange={handleInputChange}
                    rows="10"
                />
            </div>
            <button className="close-modal-button" onClick={closeModal}>
                x
            </button>
        </div>
    );
};

export default Summary;
