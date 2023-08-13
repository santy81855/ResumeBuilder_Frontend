import React, { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendChat } from "../../api/ai/AIRequests";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Content = ({
    letterData,
    setLetterData,
    handleSave,
    closeModal,
    isLoadingState,
    jobTitle,
}) => {
    const [content, setSummary] = useState(letterData.content);
    const contentRef = useRef();

    const instructions =
        " And instead of using any page breaks in your response, please use two new line characters to signify a new paragraph. Also do not include any greetings or salutations or complimentary closing statements, so don't include anything like Dear Hiring Manager or Sincerely, or anything like that. Just write the body of the cover letter.";
    const enhancePrompt =
        "enhance the following cover letter for a " +
        jobTitle +
        " job to make it more professional and better." +
        instructions;
    const generatePrompt =
        "write a 3 paragraph, 400 words or less cover letter that is professional and engaging for a " +
        jobTitle;

    var prompt = { content: "" };

    const getAIResponse = useQuery(
        ["getAIResponse", prompt], // query key including variables
        () => sendChat(prompt), // call sendChat with the variables
        {
            onSuccess: (data) => {
                setSummary(data.result.content);

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
        var userPrompt = enhancePrompt + content + instructions;
        fetchAIResponse(userPrompt);
    };

    const generate = () => {
        setSummary("");
        var userPrompt = generatePrompt + instructions;
        console.log(userPrompt);
        fetchAIResponse(userPrompt);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Cover Letter</h2>
                <h3>
                    Describe your work experience, skills, and achievements in a
                    concise and informative manner in this section.
                </h3>

                <p>
                    A cover letter is a concise document accompanying a resume,
                    introducing yourself, showcasing skills, and explaining
                    suitability for a job.
                </p>
            </div>
            <div className="long-input-container">
                <textarea
                    ref={contentRef}
                    id="content"
                    className="long-input summary"
                    placeholder="+ Write your cover letter here."
                    type="text"
                    name="content"
                    value={content}
                    onChange={() => {
                        handleSummaryChange();
                    }}
                    rows="20"
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

export default Content;
