import React, { useState } from "react";
import "../../styles/questions/BasicInfo.css";

const BasicInfo = ({ handleNext }) => {
    const [answer, setAnswer] = useState("");

    const handleInputChange = (event) => {
        setAnswer(event.target.value);
        console.log(answer);
    };

    const handleNextClick = () => {
        handleNext(answer);
    };

    return (
        <div className="question-container">
            <h2>Basic Information</h2>
            <input type="text" value={answer} onChange={handleInputChange} />
            <button onClick={handleNextClick}>Next</button>
        </div>
    );
};

export default BasicInfo;
