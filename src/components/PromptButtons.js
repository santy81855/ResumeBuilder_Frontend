import React from "react";
import "../styles/questions/ResumeInput.css";
import Loader from "./ui/Loader";
import { useTranslation, Trans } from "react-i18next";

const PromptButtons = ({
    isGenerating,
    isEnhancing,
    generate,
    enhance,
    clear,
}) => {
    const { i18n, t } = useTranslation();
    return (
        <div className="prompt-buttons">
            <div className="left">
                <button
                    className="enhance-button"
                    onClick={() => {
                        clear();
                    }}
                >
                    {t("resumeExperience.clear")}
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
                    {isEnhancing ? <Loader /> : t("resumeExperience.enhance")}
                </button>
                <button
                    className="enhance-button"
                    onClick={() => {
                        generate();
                    }}
                    disabled={isGenerating}
                >
                    {isGenerating ? <Loader /> : t("resumeExperience.generate")}
                </button>
            </div>
        </div>
    );
};

export default PromptButtons;
