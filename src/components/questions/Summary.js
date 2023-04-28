import React, { useState } from "react";
import "../../styles/questions/ResumeInput.css";

const Summary = ({
    resumeData,
    onResumeDataChange,
    handleNext,
    handlePrev,
    closeModal,
}) => {
    const [summary, setSummary] = useState(
        "Experienced web developer with a passion for creating efficient and user-friendly applications. Experienced web developer with a passion for creating efficient and user-friendly applications. Experienced web developer with a passion for creating efficient and user-friendly applications. Experienced web developer with a passion for creating efficient and user-friendly applications."
    );

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
            <div className="long-input-container">
                <textarea
                    className="long-input"
                    type="text"
                    name="summary"
                    value={summary}
                    onChange={handleInputChange}
                    rows="10"
                />
            </div>
            <button onClick={closeModal}>close</button>
            <button onClick={handlePrev}>prev</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Summary;
