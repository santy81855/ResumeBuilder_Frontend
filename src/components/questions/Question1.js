import React, { useState } from "react";

const Question1 = ({ handleNext }) => {
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
            <h2>Select a template</h2>
            <input type="text" value={answer} onChange={handleInputChange} />
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default Question1;
