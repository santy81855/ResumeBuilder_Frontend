import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendChat } from "../../api/ai/AIRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation, Trans } from "react-i18next";
import { useAppState } from "../../AppStateContext";

const ProjectsInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
    jobTitle,
}) => {
    const { i18n, t } = useTranslation();
    const { appState, setAppState } = useAppState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [demo, setDemo] = useState("");

    const nameRef = useRef();
    const descriptionRef = useRef();
    const linkRef = useRef();
    const demoRef = useRef();

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

    const [projectsList, setProjectsList] = useState(resumeData.projects);

    const [position, setPosition] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [summary, setSummary] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);
    const [experienceList, setExperienceList] = useState(resumeData.work);

    const positionRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    const summaryRef = useRef();

    const noEnhanceToast = () =>
        toast.info(t("resumeProjects.toastEnhanceError"), {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

    const fillOutAllFieldsToast = () => {
        toast.info(t("resumeProjects.toastFieldError"), {
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
                setHighlightArray[queryType](data.result.content);
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

    const enhanceHighlight = (index) => {
        if (highlightArray[index] === "") {
            noEnhanceToast();
        } else {
            var userPrompt =
                "in 20 words or less, enhance the following highlight for a project i created to make it better for a resume and to make it better for applying to be a " +
                jobTitle +
                ": " +
                highlightArray[index] +
                " and write the response in " +
                appState.language;
            fetchAIResponse(userPrompt, index);
        }
    };

    const clearHighlight = (index) => {
        setHighlightArray[index]("");
    };

    const addJob = () => {
        // get all necessary variables
        // name
        var nam = nameRef.current.value;
        var des = descriptionRef.current.value;
        var lk = linkRef.current.value;
        var dm = demoRef.current.value;
        // project highlights
        var hl = [];

        for (var i = 0; i < numHighlights; i++) {
            if (highlightArray[i] !== "") {
                hl.push(highlightArray[i]);
            }
        }

        // ensure all the necessary values are filled
        if (nam === "" || des === "") {
            fillOutAllFieldsToast();

            return;
        }
        // make an object of the vars
        var project = {
            name: nam,
            shortDescription: des,
            link: lk,
            demo: dm,
            highlights: hl,
        };
        // get the current list of job history
        var tempHistory = resumeData.projects;
        tempHistory.push(project);
        setResumeData({
            ...resumeData,
            projects: tempHistory,
        });
        // update the experienceList use state
        setProjectsList(tempHistory);
        // make the input fields blank again
        setName("");
        setDescription("");
        setLink("");
        setDemo("");
        setHighlightArray.forEach((highlight) => {
            highlight("");
        });
        setNumHighlights(1);
    };

    const removeJob = (event) => {
        // update the work array
        var tempArr = projectsList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
        // update the resumeData
        setResumeData({
            ...resumeData,
            projects: tempArr,
        });
        setProjectsList(tempArr);
    };

    const addHighlightInput = () => {
        // add it to the highlights arr
        if (numHighlights < 7) setNumHighlights(numHighlights + 1);
    };

    const removeHighlightInput = () => {
        // add it to the highlights arr
        if (numHighlights > 0) setNumHighlights(numHighlights - 1);
    };

    const editJob = (event, project) => {
        // set the input fields to the job's values
        setName(project.name);
        setDescription(project.shortDescription);
        setDemo(project.demo);
        setLink(project.link);
        setNumHighlights(project.highlights.length);
        project.highlights.forEach((highlight, index) => {
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
                <h2>{t("resumeProjects.title")}</h2>
                <p>{t("resumeProjects.description1")}</p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>{t("resumeProjects.projectName")}</p>
                    <input
                        id="name"
                        ref={nameRef}
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                        value={name}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("resumeProjects.shortDescription")}</p>
                    <input
                        id="description"
                        ref={descriptionRef}
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                        value={description}
                    ></input>
                </div>
                <div className="input-item">
                    <p>{t("resumeProjects.link")}</p>
                    <input
                        id="link"
                        ref={linkRef}
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setLink(event.target.value);
                        }}
                        value={link}
                    />
                </div>
                <div className="input-item">
                    <p>{t("resumeProjects.demo")}</p>
                    <input
                        id="demo"
                        ref={demoRef}
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setDemo(event.target.value);
                        }}
                        value={demo}
                    />
                </div>
            </div>
            <div className="job-summary-container">
                <div className="add-highlight-container">
                    <p>{t("resumeProjects.highlights")}</p>
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
                <p>{t("resumeProjects.highlightsDescription")}</p>
                <div className="highlight-text-container">
                    {numHighlights >= 1 && (
                        <div>
                            <textarea
                                id={0}
                                className="job-summary"
                                placeholder={t(
                                    "resumeProjects.highlightPlaceholder"
                                )}
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
                                        {t("resumeProjects.clear")}
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(0);
                                        }}
                                    >
                                        {t("resumeProjects.enhance")}
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
                                        {t("resumeProjects.clear")}
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(1);
                                        }}
                                    >
                                        {t("resumeProjects.enhance")}
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
                                        {t("resumeProjects.clear")}
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(2);
                                        }}
                                    >
                                        {t("resumeProjects.enhance")}
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
                                        {t("resumeProjects.clear")}
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(3);
                                        }}
                                    >
                                        {t("resumeProjects.enhance")}
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
                                        {t("resumeProjects.clear")}
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(4);
                                        }}
                                    >
                                        {t("resumeProjects.enhance")}
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
                                        {t("resumeProjects.clear")}
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(5);
                                        }}
                                    >
                                        {t("resumeProjects.enhance")}
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
                                        {t("resumeProjects.clear")}
                                    </button>
                                </div>
                                <div className="right">
                                    <button
                                        className="enhance-button"
                                        onClick={() => {
                                            enhanceHighlight(6);
                                        }}
                                    >
                                        {t("resumeProjects.enhance")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="experience-button-container">
                <button className="experience-button" onClick={addJob}>
                    {t("resumeProjects.addProject")}
                </button>
            </div>
            <div className="experience-history-container">
                {projectsList.map((project, index) => {
                    return (
                        <div key={index} className="experience-item">
                            <button
                                className="delete-experience-item-button"
                                id={index}
                                onClick={removeJob}
                            >
                                {t("resumeProjects.delete")}
                            </button>
                            <button
                                className="edit-experience-item-button"
                                id={index}
                                onClick={(event) => {
                                    editJob(event, project);
                                }}
                            >
                                {t("resumeProjects.edit")}
                            </button>
                            <div className="project-name-container">
                                <p>{project.name}</p>
                                {project.link !== "" && (
                                    <>
                                        <p>-</p>
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t("resumeProjects.linkDisplay")}
                                        </a>
                                    </>
                                )}
                                {project.demo !== "" && (
                                    <>
                                        <p>|</p>
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {t("resumeProjects.demoDisplay")}
                                        </a>
                                    </>
                                )}
                            </div>

                            <p>{project.shortDescription}</p>
                            <ul>
                                {project.highlights.map((highlight, index) => (
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
                    {t("resumeProjects.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("resumeProjects.apply")}
                </button>
            </div>
        </div>
    );
};

export default ProjectsInfo;
