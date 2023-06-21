import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const Summary = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
    fetchAIResponse,
    AIResponse,
    jobTitle,
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

    const clear = () => {
        setSummary("");
        console.log(jobTitle);
    };

    const enhance = () => {
        if (summary !== "") {
            var userPrompt =
                "enhance the following resume summary for a junior software engineer job to make it more professional and better: " +
                summary;
            fetchAIResponse(userPrompt);
            setSummary(AIResponse);
            console.log(AIResponse);
        }
    };

    const generate = () => {
        console.log(jobTitle);
        var userPrompt =
            "write a 100 words or less resume summary for a " +
            jobTitle +
            " job that is professional and engaging.";
        console.log(userPrompt);
        fetchAIResponse(userPrompt);
        setSummary(AIResponse);
        console.log(AIResponse);
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
                        handleSummaryChange(event);
                    }}
                    rows="10"
                />
            </div>
            <div className="prompt-buttons">
                <div className="left">
                    <button className="enhance-button" onClick={clear}>
                        Clear
                    </button>
                </div>
                <div className="right">
                    <button className="enhance-button" onClick={enhance}>
                        enhance
                    </button>
                    <button className="enhance-button" onClick={generate}>
                        generate
                    </button>
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

export default Summary;
