import React from "react";
import "../styles/questions/ResumeInput.css";
import Loader from "./ui/Loader";

const PromptButtons = ({
    isGenerating,
    isEnhancing,
    generate,
    enhance,
    clear,
}) => {
    return (
        <div className="prompt-buttons">
            <div className="left">
                <button
                    className="enhance-button"
                    onClick={() => {
                        clear();
                    }}
                >
                    Clear
                </button>
            </div>
            <div className="right">
                <button
                    className="enhance-button"
                    onClick={() => {
                        enhance();
                    }}
                    disabled={isEnhancing}
                >
                    {isEnhancing ? <Loader /> : "enhance"}
                </button>
                <button
                    className="enhance-button"
                    onClick={() => {
                        generate();
                    }}
                    disabled={isGenerating}
                >
                    {isGenerating ? <Loader /> : "generate"}
                </button>
            </div>
        </div>
    );
};

export default PromptButtons;
