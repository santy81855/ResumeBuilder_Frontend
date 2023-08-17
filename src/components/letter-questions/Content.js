import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendChat } from "../../api/ai/AIRequests";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PromptButtons from "../PromptButtons";
import { useTranslation, Trans } from "react-i18next";
import { useAppState } from "../../AppStateContext";

const Content = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
    jobTitle,
}) => {
    const { i18n, t } = useTranslation();
    const { appState, setAppState } = useAppState();
    const [content, setSummary] = useState(letterData.content);
    const [jobDescription, setJobDescription] = useState(
        letterData.jobDescription
    );
    const contentRef = useRef();
    const descriptionRef = useRef();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);

    const [showDescription, setShowDescription] = useState(false);

    const jobDescriptionInstructions =
        " And also use the following job description to help you make the cover letter: ";
    const instructions =
        " And instead of using any page breaks in your response, please use two new line characters to signify a new paragraph. Also do not include any greetings or salutations or complimentary closing statements, so don't include anything like Dear Hiring Manager or Sincerely, or anything like that. Just write the body of the cover letter. Also write the response in " +
        appState.language;
    const enhancePrompt =
        "enhance the following cover letter for a " +
        jobTitle +
        " job to make it more professional and better. ";
    const generatePrompt =
        "write a 3 paragraph, 400 words or less cover letter that is professional and engaging for a " +
        jobTitle +
        " job. ";

    var prompt = { content: "" };

    const getAIResponse = useQuery(
        ["getAIResponse", prompt], // query key including variables
        () => sendChat(prompt), // call sendChat with the variables
        {
            onSuccess: (data) => {
                setSummary(data.result.content);
                setIsGenerating(false);
                setIsEnhancing(false);
                setLetterData({
                    ...letterData,
                    content: data.result.content,
                });
            },
            onError: (error) => {
                console.log(error);
            },
            enabled: false,
        }
    );

    // Function to trigger the query
    const fetchAIResponse = (newVariables) => {
        prompt = { content: newVariables };
        getAIResponse.refetch();
    };

    // update letterData useState variable everytime textbox is edited
    const handleSummaryChange = () => {
        const value = contentRef.current.value;
        setSummary(value);
        setLetterData({
            ...letterData,
            content: value,
        });
    };

    const clear = () => {
        setSummary("");
    };

    const enhance = () => {
        if (content === "") {
            toast.info("There is no content to enhance.", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        if (showDescription) {
            var userPrompt =
                enhancePrompt +
                jobDescription +
                instructions +
                jobDescriptionInstructions +
                jobDescription;
        } else {
            var userPrompt = enhancePrompt + content + instructions;
        }
        setIsEnhancing(true);
        fetchAIResponse(userPrompt);
    };

    const generate = () => {
        setSummary("");
        if (showDescription) {
            var userPrompt =
                generatePrompt +
                instructions +
                jobDescriptionInstructions +
                jobDescription;
        } else {
            var userPrompt = generatePrompt + instructions;
        }
        setIsGenerating(true);
        fetchAIResponse(userPrompt);
    };

    const handleChange = (event) => {
        switch (event.target.id) {
            case "description":
                var value = descriptionRef.current.value;
                setJobDescription(value);
                setLetterData({
                    ...letterData,
                    jobDescription: value,
                });
                return;
            default:
                return;
        }
    };

    const clickToggle = (event) => {
        setShowDescription(!showDescription);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("letterContent.title")}</h2>
                <h3>{t("letterContent.description1")}</h3>

                <p>{t("letterContent.description2")}</p>
            </div>
            <div className="long-input-container">
                <div className="description-toggle-container">
                    <button
                        className="description-toggle"
                        onClick={(event) => {
                            clickToggle(event);
                        }}
                    >
                        {showDescription && <div className="toggle-on"></div>}
                    </button>
                    <p>{t("letterContent.jobDescription")}</p>
                </div>
                {showDescription && (
                    <textarea
                        id="description"
                        ref={descriptionRef}
                        className="long-input summary"
                        type="text"
                        name="job description"
                        onChange={handleChange}
                        value={jobDescription}
                        placeholder={t(
                            "letterContent.jobDescriptionPlaceholder"
                        )}
                        rows="10"
                    />
                )}
            </div>
            <div className="long-input-container">
                <textarea
                    ref={contentRef}
                    id="content"
                    className="long-input summary"
                    placeholder={t("letterContent.contentPlaceholder")}
                    type="text"
                    name="content"
                    value={isGenerating || isEnhancing ? "loading..." : content}
                    onChange={() => {
                        handleSummaryChange();
                    }}
                    disabled={isGenerating || isEnhancing}
                    rows="20"
                />
                <PromptButtons
                    clear={clear}
                    enhance={enhance}
                    generate={generate}
                    isGenerating={isGenerating}
                    isEnhancing={isEnhancing}
                />
            </div>

            <div className="question-container-button-container">
                <button
                    className="question-container-close-button"
                    onClick={closeModal}
                >
                    {t("letterContent.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("letterContent.apply")}
                </button>
            </div>
        </div>
    );
};

export default Content;
