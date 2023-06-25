import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendChat } from "../../api/ai/AIRequests";

const ExperienceInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
    jobTitle,
}) => {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [summary, setSummary] = useState("");

    const [experienceList, setExperienceList] = useState(resumeData.work);

    const companyRef = useRef();
    const positionRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    const summaryRef = useRef();

    const [numHighlights, setNumHighlights] = useState(1);

    const [highlight1, setHighlight1] = useState("");
    const [highlight2, setHighlight2] = useState("");
    const [highlight3, setHighlight3] = useState("");
    const [highlight4, setHighlight4] = useState("");
    const [highlight5, setHighlight5] = useState("");
    const [highlight6, setHighlight6] = useState("");
    const [highlight7, setHighlight7] = useState("");

    var prompt = { content: "" };

    const getAIResponse = useQuery(
        ["getAIResponse", prompt], // query key including variables
        () => sendChat(prompt), // call sendChat with the variables
        {
            onSuccess: (data) => {
                console.log(data.result.content);
                setSummary(data.result.content);
            },
            onError: (error) => {
                console.log("Error getting AI response. Error:", error);
            },
            enabled: false,
        }
    );

    // Function to trigger the query
    const fetchAIResponse = (newVariables) => {
        prompt = { content: newVariables };
        getAIResponse.refetch();
    };

    const clear = () => {
        setSummary("");
    };

    const enhance = () => {
        if (
            companyRef.current.value === "" &&
            positionRef.current.value === ""
        ) {
            alert(
                "Please fill out the company name and your position in that company."
            );
            return;
        } else if (positionRef.current.value === "") {
            alert("Please fill out the position for this job.");
            return;
        } else if (companyRef.current.value === "") {
            alert("Please fill out the company name.");
            return;
        }
        if (summary !== "") {
            var userPrompt =
                "enhance the following job summary for a " +
                positionRef.current.value +
                " job to make it more professional and to make it better for applying to be a " +
                jobTitle +
                ": " +
                summary;
            fetchAIResponse(userPrompt);
        }
    };

    const generate = () => {
        if (
            companyRef.current.value === "" &&
            positionRef.current.value === ""
        ) {
            alert(
                "Please fill out the company name and your position in that company."
            );
            return;
        } else if (positionRef.current.value === "") {
            alert("Please fill out the position for this job.");
            return;
        } else if (companyRef.current.value === "") {
            alert("Please fill out the company name.");
            return;
        }
        console.log(jobTitle);
        setSummary("");
        var userPrompt =
            "write a 40 words or less job summary for when I was a " +
            positionRef.current.value +
            " that is professional and engaging for applying to be a " +
            jobTitle;
        console.log(userPrompt);
        fetchAIResponse(userPrompt);
    };

    const addJob = () => {
        // get all necessary variables
        // company
        var comp = companyRef.current.value;
        // position
        var pos = positionRef.current.value;
        // start date
        var st = startRef.current.value;
        // end date
        var en = endRef.current.value;
        // job summary
        var sum = summaryRef.current.value;
        // job highlights
        var hl = [];
        if (numHighlights >= 1) {
            hl.push(highlight1);
        }
        if (numHighlights >= 2) {
            hl.push(highlight2);
        }
        if (numHighlights >= 3) {
            hl.push(highlight3);
        }
        if (numHighlights >= 4) {
            hl.push(highlight4);
        }
        if (numHighlights >= 5) {
            hl.push(highlight5);
        }
        if (numHighlights >= 6) {
            hl.push(highlight6);
        }
        if (numHighlights >= 7) {
            hl.push(highlight7);
        }
        // ensure all the necessary values are filled
        if (comp === "" || pos === "" || st === "" || en === "" || sum === "") {
            alert("Fill out all of the fields.");
            return;
        }
        // make an object of the vars
        var job = {
            company: comp,
            position: pos,
            startDate: st,
            endDate: en,
            summary: sum,
            highlights: hl,
        };
        // get the current list of job history
        var tempHistory = resumeData.work;
        tempHistory.push(job);
        setResumeData({
            ...resumeData,
            work: tempHistory,
        });
        // make the input fields blank again
        setCompany("");
        setPosition("");
        setStart("");
        setEnd("");
        setSummary("");
        setHighlight1("");
        setHighlight2("");
        setHighlight3("");
        setHighlight4("");
        setHighlight5("");
        setHighlight6("");
        setHighlight7("");
    };

    const removeJob = (event) => {
        // get the json jobs list
        var jsonWork = resumeData.work;
        // get the job to remove
        var jobToDelete = experienceList[event.target.id];
        // remove it from the list
        var updatedArr = jsonWork.filter(
            (item) => item.summary !== jobToDelete.summary
        );
        // update the resumeData
        setResumeData({
            ...resumeData,
            work: updatedArr,
        });
        // update the skillList
        var tempArr = experienceList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
        setExperienceList(tempArr);
    };

    const addHighlightInput = () => {
        // add it to the highlights arr
        if (numHighlights < 7) setNumHighlights(numHighlights + 1);
    };

    const removeHighlightInput = () => {
        // add it to the highlights arr
        if (numHighlights > 0) setNumHighlights(numHighlights - 1);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Employment History</h2>
                <p>Enter your previous work experience in this section.</p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>Company</p>
                    <input
                        id="company"
                        ref={companyRef}
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setCompany(event.target.value);
                        }}
                        value={company}
                    ></input>
                </div>
                <div className="input-item">
                    <p>Position</p>
                    <input
                        id="position"
                        ref={positionRef}
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setPosition(event.target.value);
                        }}
                        value={position}
                    ></input>
                </div>
                <div className="input-item">
                    <p>Start Date</p>
                    <input
                        id="start"
                        ref={startRef}
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setStart(event.target.value);
                        }}
                        value={start}
                    ></input>
                </div>
                <div className="input-item">
                    <p>End Date</p>
                    <input
                        id="end"
                        ref={endRef}
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setEnd(event.target.value);
                        }}
                        value={end}
                    ></input>
                </div>
            </div>
            <div className="job-summary-container">
                <p>Job Summary</p>
                <textarea
                    ref={summaryRef}
                    className="job-summary"
                    placeholder="+ Write your summary here."
                    type="text"
                    name="summary"
                    onChange={(event) => {
                        setSummary(event.target.value);
                    }}
                    value={summary}
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
            <div className="job-summary-container">
                <div className="add-highlight-container">
                    <p>Highlights</p>
                    <div className="highlight-button-container">
                        <button
                            className="plus-button"
                            onClick={addHighlightInput}
                        >
                            +
                        </button>
                        <button
                            className="minus-button"
                            onClick={removeHighlightInput}
                        >
                            -
                        </button>
                    </div>
                </div>
                <div className="highlight-text-container">
                    {numHighlights >= 1 && (
                        <textarea
                            id={0}
                            className="job-summary"
                            placeholder="+ Write your summary here."
                            type="text"
                            onChange={(event) => {
                                setHighlight1(event.target.value);
                            }}
                            value={highlight1}
                            rows="3"
                        />
                    )}
                    {numHighlights >= 2 && (
                        <textarea
                            id={1}
                            className="job-summary"
                            placeholder="+ Write your summary here."
                            type="text"
                            onChange={(event) => {
                                setHighlight2(event.target.value);
                            }}
                            value={highlight2}
                            rows="3"
                        />
                    )}
                    {numHighlights >= 3 && (
                        <textarea
                            id={2}
                            className="job-summary"
                            placeholder="+ Write your summary here."
                            type="text"
                            onChange={(event) => {
                                setHighlight3(event.target.value);
                            }}
                            value={highlight3}
                            rows="3"
                        />
                    )}
                    {numHighlights >= 4 && (
                        <textarea
                            id={3}
                            className="job-summary"
                            placeholder="+ Write your summary here."
                            type="text"
                            onChange={(event) => {
                                setHighlight4(event.target.value);
                            }}
                            value={highlight4}
                            rows="3"
                        />
                    )}
                    {numHighlights >= 5 && (
                        <textarea
                            id={4}
                            className="job-summary"
                            placeholder="+ Write your summary here."
                            type="text"
                            onChange={(event) => {
                                setHighlight5(event.target.value);
                            }}
                            value={highlight5}
                            rows="3"
                        />
                    )}
                    {numHighlights >= 6 && (
                        <textarea
                            id={5}
                            className="job-summary"
                            placeholder="+ Write your summary here."
                            type="text"
                            onChange={(event) => {
                                setHighlight6(event.target.value);
                            }}
                            value={highlight6}
                            rows="3"
                        />
                    )}
                    {numHighlights >= 7 && (
                        <textarea
                            id={6}
                            className="job-summary"
                            placeholder="+ Write your summary here."
                            type="text"
                            onChange={(event) => {
                                setHighlight7(event.target.value);
                            }}
                            value={highlight7}
                            rows="3"
                        />
                    )}
                </div>
            </div>
            <div className="experience-button-container">
                <button className="experience-button" onClick={addJob}>
                    Add Job
                </button>
            </div>
            <div className="experience-history-container">
                {experienceList.map((job, index) => (
                    <div className="experience-item">
                        <button
                            className="delete-experience-item-button"
                            id={index}
                            onClick={removeJob}
                        >
                            Delete
                        </button>
                        <h3>
                            {job.position}, {job.company}
                        </h3>
                        <p>
                            {job.startDate} - {job.endDate}
                        </p>
                        <p>{job.summary}</p>
                        <ul>
                            {job.highlights.map((highlight, index) => (
                                <li>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                ))}
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

export default ExperienceInfo;
