import React, { useState } from "react";
import "../styles/CreateResume.css";

import BasicInfo from "./questions/BasicInfo";
import Question2 from "./questions/Question2";

import JSONResumeData from "../resume-schema.json";
import CleanTemplate from "./templates/CleanTemplate";

function CreateResume() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [currentTemplate, setCurrentTemplate] = useState(1);

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handlePrev = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const renderQuestion = () => {
        switch (currentQuestion) {
            case 1:
                return <BasicInfo handleNext={handleNext} />;
            case 2:
                return (
                    <Question2
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                    />
                );
            default:
                return null;
        }
    };
    const renderTemplate = () => {
        switch (currentTemplate) {
            case 1:
                return <CleanTemplate resumeData={JSONResumeData} />;
            default:
                return null;
        }
    };

    return (
        <div className="create-resume-page-container">
            {renderQuestion()}
            {renderTemplate()}
        </div>
    );
}

export default CreateResume;
