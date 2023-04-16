import React, { useState } from "react";
import "../styles/CreateResume.css";
import Question1 from "./questions/Question1";
import Question2 from "./questions/Question2";

function CreateResume() {
    const [currentQuestion, setCurrentQuestion] = useState(1);

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handlePrev = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const renderQuestion = () => {
        switch (currentQuestion) {
            case 1:
                return <Question1 handleNext={handleNext} />;
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

    return <div>{renderQuestion()}</div>;
}

export default CreateResume;
