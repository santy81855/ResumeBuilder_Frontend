import React, { useState } from "react";

const Question2 = ({ handleNext, handlePrev }) => {
    const [answer, setAnswer] = useState("");

    const handleInputChange = (event) => {
        setAnswer(event.target.value);
        console.log(answer);
    };

    const handleNextClick = () => {
        handleNext(answer);
    };
    return (
        <div>
            <h2>Fill out basic info</h2>
            <input type="text" value={answer} onChange={handleInputChange} />
            <button onClick={handlePrev}>prev</button>
            <button onClick={handleNext}>Next</button>
        </div>
    );
};

export default Question2;
