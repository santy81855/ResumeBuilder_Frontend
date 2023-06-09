import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendChat } from "../../api/ai/AIRequests";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Summary = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
    jobTitle,
}) => {
    const [summary, setSummary] = useState(resumeData.summary);
    const summaryRef = useRef();

    const enhancePrompt =
        "enhance the following resume summary for a " +
        jobTitle +
        " job to make it more professional and better: ";
    const generatePrompt =
        "write a 80 words or less resume summary that is professional and engaging for a ";
    var prompt = { content: "" };

    const getAIResponse = useQuery(
        ["getAIResponse", prompt], // query key including variables
        () => sendChat(prompt), // call sendChat with the variables
        {
            onSuccess: (data) => {
                setSummary(data.result.content);

                setResumeData({
                    ...resumeData,
                    summary: data.result.content,
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

    // update resumeData useState variable everytime textbox is edited
    const handleSummaryChange = () => {
        const value = summaryRef.current.value;
        setSummary(value);
        setResumeData({
            ...resumeData,
            summary: value,
        });
    };

    const clear = () => {
        setSummary("");
    };

    const enhance = () => {
        if (summary === "") {
            toast.info("There is no summary to enhance.", {
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
        var userPrompt = enhancePrompt + summary;
        fetchAIResponse(userPrompt);
    };

    const generate = () => {
        setSummary("");
        var userPrompt = generatePrompt + jobTitle;
        fetchAIResponse(userPrompt);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Summary</h2>
                <h3>
                    Describe your work experience, skills, and achievements in a
                    concise and informative manner in this section.
                </h3>

                <p>
                    This section should highlight your unique value proposition
                    as a candidate and grab the attention of the hiring manager.
                </p>
            </div>
            <div className="long-input-container">
                <p>Summary</p>
                <textarea
                    ref={summaryRef}
                    id="summary"
                    className="long-input summary"
                    placeholder="+ Write your summary here."
                    type="text"
                    name="summary"
                    value={summary}
                    onChange={() => {
                        handleSummaryChange();
                    }}
                    rows="10"
                />
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
