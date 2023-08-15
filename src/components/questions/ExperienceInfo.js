import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendChat } from "../../api/ai/AIRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PromptButtons from "../PromptButtons";

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
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [summary, setSummary] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);
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
    const highlightArray = [
        highlight1,
        highlight2,
        highlight3,
        highlight4,
        highlight5,
        highlight6,
        highlight7,
    ];
    const setHighlightArray = [
        setHighlight1,
        setHighlight2,
        setHighlight3,
        setHighlight4,
        setHighlight5,
        setHighlight6,
        setHighlight7,
    ];

    const noEnhanceToast = () =>
        toast.info("There is nothing to enhance.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    const fillOutCompanyAndPositionToast = () => {
        toast.info(
            "Please fill out the company name and your position in that company.",
            {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }
        );
    };
    const fillOutPositionToast = () => {
        toast.info("Please fill out the position for this job.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const fillOutCompanyToast = () => {
        toast.info("Please fill out the company name.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    const fillOutAllFieldsToast = () => {
        toast.info("Please fill out all of the fields.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    var prompt = { content: "" };
    var queryType = -1;

    const getAIResponse = useQuery(
        ["getAIResponse", prompt, queryType], // query key including variables
        () => sendChat(prompt), // call sendChat with the variables
        {
            onSuccess: (data) => {
                if (queryType === -1) {
                    setSummary(data.result.content);
                } else {
                    setHighlightArray[queryType](data.result.content);
                }
                setIsGenerating(false);
                setIsEnhancing(false);
            },
            onError: (error) => {
                console.log(error);
            },
            enabled: false,
        }
    );

    // Function to trigger the query
    const fetchAIResponse = (userPrompt, qType) => {
        queryType = qType;
        prompt = { content: userPrompt };
        getAIResponse.refetch();
    };

    const generateHighlight = (index) => {
        if (
            companyRef.current.value === "" &&
            positionRef.current.value === ""
        ) {
            fillOutCompanyAndPositionToast();
            return;
        } else if (positionRef.current.value === "") {
            fillOutPositionToast();
            return;
        } else if (companyRef.current.value === "") {
            fillOutCompanyToast();
            return;
        }
        var userPrompt =
            "in 20 words or less, write a job highlight for when I worked as a " +
            positionRef.current.value +
            " that is professional and better for a resume for applying to be a " +
            jobTitle;
        fetchAIResponse(userPrompt, index);
    };

    const enhanceHighlight = (index) => {
        if (highlightArray[index] === "") {
            noEnhanceToast();
        } else {
            if (
                companyRef.current.value === "" &&
                positionRef.current.value === ""
            ) {
                fillOutCompanyAndPositionToast();
                return;
            } else if (positionRef.current.value === "") {
                fillOutPositionToast();
                return;
            } else if (companyRef.current.value === "") {
                fillOutCompanyToast();
                return;
            }

            var userPrompt =
                "in 20 words or less, enhance the following job highlight for when I worked as a " +
                positionRef.current.value +
                " to make it better for a resume and to make it better for applying to be a " +
                jobTitle +
                ": " +
                highlightArray[index];
            fetchAIResponse(userPrompt, index);
        }
    };

    const clearHighlight = (index) => {
        setHighlightArray[index]("");
    };

    const clear = () => {
        setSummary("");
    };

    const enhance = () => {
        if (summary === "") {
            noEnhanceToast();
        } else {
            if (
                companyRef.current.value === "" &&
                positionRef.current.value === ""
            ) {
                fillOutCompanyAndPositionToast();
                return;
            } else if (positionRef.current.value === "") {
                fillOutPositionToast();
                return;
            } else if (companyRef.current.value === "") {
                fillOutCompanyToast();
                return;
            }
            if (summary !== "") {
                var userPrompt =
                    "in 40 words or less, enhance the following job summary for a " +
                    positionRef.current.value +
                    " job to make it more professional and to make it better for applying to be a " +
                    jobTitle +
                    ": " +
                    summary;
                setIsEnhancing(true);
                fetchAIResponse(userPrompt, -1);
            }
        }
    };

    const generate = () => {
        if (
            companyRef.current.value === "" &&
            positionRef.current.value === ""
        ) {
            fillOutCompanyAndPositionToast();
            return;
        } else if (positionRef.current.value === "") {
            fillOutPositionToast();
            return;
        } else if (companyRef.current.value === "") {
            fillOutCompanyToast();
            return;
        }
        setSummary("");
        var userPrompt =
            "write a 40 words or less job summary for when I was a " +
            positionRef.current.value +
            " that is professional and engaging for applying to be a " +
            jobTitle;
        setIsGenerating(true);
        fetchAIResponse(userPrompt, -1);
    };

    const addJob = () => {
        // get all necessary variables
        // company
        var comp = companyRef.current.value;
        // position
        var pos = positionRef.current.value;
        // start date
        var st = start;
        // end date
        var en = isCurrent ? "Current" : end;
        // job summary
        var sum = summaryRef.current.value;
        // job highlights
        var hl = [];

        for (var i = 0; i < numHighlights; i++) {
            if (highlightArray[i] !== "") {
                hl.push(highlightArray[i]);
            }
        }

        // ensure all the necessary values are filled
        if (comp === "" || pos === "" || st === "" || en === "" || sum === "") {
            fillOutAllFieldsToast();

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
        // update the experienceList use state
        setExperienceList(tempHistory);
        // make the input fields blank again
        setCompany("");
        setPosition("");
        setStart("");
        setEnd("");
        setSummary("");

        setHighlightArray.forEach((highlight) => {
            highlight("");
        });
        setNumHighlights(1);
        setIsCurrent(false);
    };

    const removeJob = (event) => {
        // update the work array
        var tempArr = experienceList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
        // update the resumeData
        setResumeData({
            ...resumeData,
            work: tempArr,
        });
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

    const isDateObject = (item) => {
        return item instanceof Date;
    };

    const isValidDate = (dateString) => {
        try {
            var date = new Date(dateString);
            if (date.toString() === "Invalid Date") {
                return false;
            } else {
                return true;
            }
        } catch (e) {
            return false;
        }
    };

    const editJob = (event, job) => {
        // set the input fields to the job's values
        setCompany(job.company);
        setPosition(job.position);
        // if the start date is already a date object then just set it
        if (isDateObject(job.startDate) === true) {
            setStart(job.startDate);
        } else {
            // otherwise check if it is a valid date string
            if (isValidDate(job.startDate) === true) {
                setStart(new Date(job.startDate));
            }
        }
        // if the end date is already a date object then just set it
        if (isDateObject(job.endDate) === true) {
            setEnd(job.endDate);
        } else {
            // otherwise check if it is a valid date string
            if (isValidDate(job.endDate) === true) {
                setEnd(new Date(job.endDate));
            } else {
                setIsCurrent(true);
            }
        }
        setSummary(job.summary);
        setNumHighlights(job.highlights.length);
        job.highlights.forEach((highlight, index) => {
            setHighlightArray[index](highlight);
        });
        // remove the job from the work array
        removeJob(event);
        // scroll up to the top of the modal
        const header = document.getElementById("header");
        header.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="question-container">
            <div id="header" className="header">
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
                    <DatePicker
                        className="short-input"
                        ref={startRef}
                        selected={start}
                        onChange={(date) => setStart(date)}
                    />
                </div>
                <div className="input-item">
                    <div className="end-date-container">
                        <p>End Date</p>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "var(--gap-small)",
                            }}
                        >
                            <p>Current:</p>
                            <button
                                className="isCurrentButton"
                                onClick={(event) => {
                                    if (isCurrent) {
                                        event.target.style.backgroundColor =
                                            "white";
                                        event.target.style.color =
                                            "var(--accent-color-2)";
                                    } else {
                                        event.target.style.backgroundColor =
                                            "var(--accent-color-2)";
                                        event.target.style.color = "white";
                                    }
                                    setIsCurrent(!isCurrent);
                                }}
                            >
                                {isCurrent ? "X" : ""}
                            </button>
                        </div>
                    </div>
                    {isCurrent ? (
                        <input
                            id="date"
                            className="short-input"
                            type="text"
                            value="Current"
                            disabled
                        />
                    ) : (
                        <DatePicker
                            className="short-input"
                            ref={endRef}
                            selected={end}
                            onChange={(date) => {
                                setEnd(date);
                            }}
                        />
                    )}
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
                <PromptButtons
                    clear={clear}
                    enhance={enhance}
                    generate={generate}
                    isGenerating={isGenerating}
                    isEnhancing={isEnhancing}
                />
            </div>
            <div className="job-summary-container">
                <div className="add-highlight-container">
                    <p>Highlights</p>
                    <div className="highlight-button-container">
                        <button
                            className="minus-button"
                            onClick={removeHighlightInput}
                        >
                            -
                        </button>
                        <p>{numHighlights}</p>
                        <button
                            className="plus-button"
                            onClick={addHighlightInput}
                        >
                            +
                        </button>
                    </div>
                </div>
                <p>
                    You can change the number of highlights by adding or
                    removing them with the buttons above. If you don't wish to
                    add any highlights, leave the fields blank.
                </p>
                <div className="highlight-text-container">
                    {numHighlights >= 1 && (
                        <div>
                            <textarea
                                id={0}
                                className="job-summary"
                                placeholder="+ Write your highlight here."
                                type="text"
                                onChange={(event) => {
                                    setHighlight1(event.target.value);
                                }}
                                value={highlight1}
                                rows="3"
                            />
                            <div className="prompt-buttons">
                                <div className="left">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            clearHighlight(0);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(0);
                                        }}
                                    >
                                        enhance
                                    </button>
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            generateHighlight(0);
                                        }}
                                    >
                                        generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {numHighlights >= 2 && (
                        <div style={{ marginTop: "2em" }}>
                            <textarea
                                id={1}
                                className="job-summary"
                                placeholder="+ Write your highlight here."
                                type="text"
                                onChange={(event) => {
                                    setHighlight2(event.target.value);
                                }}
                                value={highlight2}
                                rows="3"
                            />
                            <div className="prompt-buttons">
                                <div className="left">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            clearHighlight(1);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(1);
                                        }}
                                    >
                                        enhance
                                    </button>
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            generateHighlight(1);
                                        }}
                                    >
                                        generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {numHighlights >= 3 && (
                        <div style={{ marginTop: "2em" }}>
                            <textarea
                                id={2}
                                className="job-summary"
                                placeholder="+ Write your highlight here."
                                type="text"
                                onChange={(event) => {
                                    setHighlight3(event.target.value);
                                }}
                                value={highlight3}
                                rows="3"
                            />
                            <div className="prompt-buttons">
                                <div className="left">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            clearHighlight(2);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(2);
                                        }}
                                    >
                                        enhance
                                    </button>
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            generateHighlight(2);
                                        }}
                                    >
                                        generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {numHighlights >= 4 && (
                        <div style={{ marginTop: "2em" }}>
                            <textarea
                                id={3}
                                className="job-summary"
                                placeholder="+ Write your highlight here."
                                type="text"
                                onChange={(event) => {
                                    setHighlight4(event.target.value);
                                }}
                                value={highlight4}
                                rows="3"
                            />
                            <div className="prompt-buttons">
                                <div className="left">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            clearHighlight(3);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(3);
                                        }}
                                    >
                                        enhance
                                    </button>
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            generateHighlight(3);
                                        }}
                                    >
                                        generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {numHighlights >= 5 && (
                        <div style={{ marginTop: "2em" }}>
                            <textarea
                                id={4}
                                className="job-summary"
                                placeholder="+ Write your highlight here."
                                type="text"
                                onChange={(event) => {
                                    setHighlight5(event.target.value);
                                }}
                                value={highlight5}
                                rows="3"
                            />
                            <div className="prompt-buttons">
                                <div className="left">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            clearHighlight(4);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(4);
                                        }}
                                    >
                                        enhance
                                    </button>
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            generateHighlight(4);
                                        }}
                                    >
                                        generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {numHighlights >= 6 && (
                        <div style={{ marginTop: "2em" }}>
                            <textarea
                                id={5}
                                className="job-summary"
                                placeholder="+ Write your highlight here."
                                type="text"
                                onChange={(event) => {
                                    setHighlight6(event.target.value);
                                }}
                                value={highlight6}
                                rows="3"
                            />
                            <div className="prompt-buttons">
                                <div className="left">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            clearHighlight(5);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(5);
                                        }}
                                    >
                                        enhance
                                    </button>
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            generateHighlight(5);
                                        }}
                                    >
                                        generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {numHighlights >= 7 && (
                        <div style={{ marginTop: "2em" }}>
                            <textarea
                                id={6}
                                className="job-summary"
                                placeholder="+ Write your highlight here."
                                type="text"
                                onChange={(event) => {
                                    setHighlight7(event.target.value);
                                }}
                                value={highlight7}
                                rows="3"
                            />
                            <div className="prompt-buttons">
                                <div className="left">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            clearHighlight(6);
                                        }}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(6);
                                        }}
                                    >
                                        enhance
                                    </button>
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            generateHighlight(6);
                                        }}
                                    >
                                        generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="experience-button-container">
                <button className="experience-button" onClick={addJob}>
                    Add Job
                </button>
            </div>
            <div className="experience-history-container">
                {experienceList.map((job, index) => {
                    const formattedDateStart = job.startDate.toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    );
                    const formattedDateEnd = job.endDate.toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    );
                    return (
                        <div key={index} className="experience-item">
                            <button
                                className="delete-experience-item-button"
                                id={index}
                                onClick={removeJob}
                            >
                                Delete
                            </button>
                            <button
                                className="edit-experience-item-button"
                                id={index}
                                onClick={(event) => {
                                    editJob(event, job);
                                }}
                            >
                                Edit
                            </button>
                            <h3>
                                {job.position}, {job.company}
                            </h3>
                            <p>
                                {formattedDateStart} - {formattedDateEnd}
                            </p>
                            <p>{job.summary}</p>
                            <ul>
                                {job.highlights.map((highlight, index) => (
                                    <li key={highlight}>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
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
