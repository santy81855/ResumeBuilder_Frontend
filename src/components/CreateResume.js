import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateResume.css";

import Loader from "./ui/Loader";
import BasicInfo from "./questions/BasicInfo";
import Summary from "./questions/Summary";
import ResumeSkeleton from "./skeletons/ResumeSkeleton";

import JSONResumeData from "../resume-schema.json";
import CleanTemplate from "./templates/CleanTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import {
    templateToString,
    templateNameToExport,
    templateToInt,
} from "../lib/TemplateKeys";

import Modal from "react-modal";
import Switch from "react-switch";

import { savePDF } from "@progress/kendo-react-pdf";

import { useQuery, useMutation } from "@tanstack/react-query";

import {
    createResume,
    updateResumeById,
    getResumeById,
} from "../api/resume/ResumeRequests";

function CreateResume() {
    const navigate = useNavigate();
    const [currentTemplate, setCurrentTemplate] = useState(0);
    const [currentlySelectedSection, setCurrentlySelectedSection] =
        useState(null);

    const [resumeData, setResumeData] = useState(JSONResumeData); // lifted state
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoadingState, setIsLoading] = useState(false);

    const [resumeTitle, setResumeTitle] = useState("");
    const [resumeDescription, setResumeDescription] = useState("");

    const titleRef = useRef();
    const descriptionRef = useRef();
    const LOADING_TIME = 1000;

    const TOGGLE_SIDEBAR_SIZE = 768;

    useEffect(() => {
        const resumeId = localStorage.getItem("resumeId");
        // if this is not a new resume
        if (!!resumeId) {
            getResumeQuery.refetch();
        }

        // handle resize for the floating menu at the bottom of the page
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getResumeQuery = useQuery({
        queryKey: ["getResumeById"],
        queryFn: getResumeById,
        onSuccess: (data, variables, context) => {
            console.log(
                "Just fetched resume data in CreateResume component. Data: "
            );
            setResumeData(data.json);
            setResumeTitle(data.resumeTitle);
            setResumeDescription(data.resumeDescription);
            setCurrentTemplate(templateToInt[data.template]);
            console.log(data);
        },
        onError: (error, variables, context) => {
            console.log(
                "Error Fetching resumes in CreateResume component. Error: "
            );
            console.log(error);
        },
        enabled: false,
    });

    const createResumeMutation = useMutation({
        mutationFn: createResume,
        onSuccess: (data, variables, context) => {
            // add resumeId to local storage
            localStorage.setItem("resumeId", data._id);
            console.log(
                "Resume Created Successfully in CreateResume component."
            );
            // wait LOADING_TIME so user has feedback about the process
            setTimeout(function () {
                setIsLoading(false);
                navigate("/u/edit-resume");
            }, LOADING_TIME);
        },
        onError: (error, variables, context) => {
            console.log(
                "Problem Creating Resume in CreateResume component. Error: "
            );
            console.log(error);
            setIsLoading(false);
        },
        enabled: false,
    });

    const updateResumeMutation = useMutation({
        mutationFn: updateResumeById,
        onSuccess: (data, variables, context) => {
            console.log(
                "Resume Updated Successfully in CreateResume component."
            );
            // wait LOADING_TIME so user has feedback about the process
            setTimeout(function () {
                setIsLoading(false);
            }, LOADING_TIME);
            //console.log(context);
            //console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(
                "Problem Updating Resume in CreateResume component. Error: "
            );
            console.log(error);
            setIsLoading(false);
        },
    });

    function handleSave() {
        const resumeId = localStorage.getItem("resumeId");
        setIsLoading(true);
        // if there is a resumeId we UPDATE
        if (resumeId) {
            updateResumeMutation.mutate({
                resumeTitleParam: titleRef.current.value.toString(),
                resumeDescriptionParam: descriptionRef.current.value.toString(),
                templateParam: templateToString[currentTemplate],
                jsonParam: resumeData,
            });
            // otherwise // create
        } else {
            createResumeMutation.mutate({
                resumeTitleParam: titleRef.current.value.toString(),
                resumeDescriptionParam: descriptionRef.current.value.toString(),
                templateParam: templateToString[currentTemplate],
                jsonParam: resumeData,
            });
        }
    }

    // handle when screen is < 480 and user clicks out of thu floating menu
    const handleClick = (event, width) => {
        const sideBar = document.getElementById("side-bar");
        const button = document.getElementById("side-bar-toggle-button");

        // Check if the clicked element is outside the sidebar and the toggle button
        if (!!sideBar && !!button && width < TOGGLE_SIDEBAR_SIZE)
            if (!sideBar.contains(event.target) && event.target !== button) {
                closeSideBar();
            }
    };
    // handle resize for when the floating menu should or should not be toggleable
    function handleResize() {
        if (window.innerWidth > TOGGLE_SIDEBAR_SIZE) {
            const sideBar = document.getElementById("side-bar");
            const button = document.getElementById("side-bar-toggle-button");

            if (!!sideBar && !!button) {
                sideBar.style.transform = "translateY(0%)";
                sideBar.style.left = "2.5%";
                sideBar.style.bottom = "0.5em";
                button.style.display = "none";
            }
        }
        document.addEventListener("click", (event) =>
            handleClick(event, window.innerWidth)
        );
    }

    const handleResumeDataChange = (newResumeData) => {
        // callback function to update the resumeData state
        setResumeData(newResumeData);
        handleSave();
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {}

    function closeModal() {
        setIsOpen(false);
    }

    const handleSectionChange = (selectedSection) => {
        openModal(true);
        setCurrentlySelectedSection(selectedSection);
    };

    const exportPDF = () => {
        const content = document.getElementById(
            templateNameToExport[currentTemplate]
        );
        console.log(templateNameToExport[currentTemplate]);
        savePDF(content, {
            // paperSize: "auto",
            paperSize: "Letter",
            margin: 0,
            fileName: titleRef.current.value,
            landscape: false,
            pdf: {
                multiPage: false,
                font: "Arial",
            },
        });
    };

    const handleBack = () => {
        navigate("/u/resumes");
    };

    const handleResumeTitleChange = (event) => {
        setResumeTitle(event.target.value);
    };
    const handleResumeDescriptionChange = (event) => {
        setResumeDescription(event.target.value);
    };

    const openSideBar = (event) => {
        const sideBar = document.getElementById("side-bar");
        const button = event.target;

        sideBar.style.transform = "translateY(0%)";
        sideBar.style.left = "2.5%";
        sideBar.style.bottom = "0.5em";
        button.style.display = "none";
    };

    const closeSideBar = (event) => {
        const button = document.getElementById("side-bar-toggle-button");
        const sideBar = document.getElementById("side-bar");
        sideBar.style.transform = "translateY(100%)";
        sideBar.style.left = "0";
        sideBar.style.bottom = "0";
        button.style.display = "flex";
    };

    const renderQuestion = () => {
        switch (currentlySelectedSection) {
            case 1:
                return (
                    <BasicInfo
                        resumeData={resumeData}
                        currentlySelectedSection={currentlySelectedSection}
                        onResumeDataChange={handleResumeDataChange} // passing down the callback function as props
                    />
                );
            case 2:
                return (
                    <Modal
                        className="modal"
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="summary-modal"
                        overlayClassName="overlay"
                    >
                        <Summary
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleSave={handleSave}
                            closeModal={closeModal}
                            isLoadingState={isLoadingState}
                        />
                    </Modal>
                );
            case 3:
                return (
                    <Summary
                        resumeData={resumeData}
                        currentlySelectedSection={currentlySelectedSection}
                        onResumeDataChange={handleResumeDataChange} // passing down the callback function as props
                    />
                );
            default:
                return null;
        }
    };

    const selectionChange = (event) => {
        console.log(event);
    };

    const test = <div>hello this is em</div>;
    function SectionContainer() {
        const switchItems = [true, false, true, false, true, true, false]; // Example array of switch states

        return (
            <div className="section-selection-container">
                {switchItems.map((item, index) => (
                    <div className="section-option">
                        <Switch
                            key={index}
                            checked={item}
                            onChange={() => {}}
                            className="switch-item"
                        />
                        <p>hi</p>
                    </div>
                ))}
            </div>
        );
    }
    const renderSectionSelector = () => {
        switch (currentTemplate) {
            case 0:
                return <SectionContainer />;
            default:
                return <div>naur</div>;
        }
    };

    const renderTemplate = () => {
        switch (currentTemplate) {
            case 0:
                return (
                    <CleanTemplate
                        resumeData={resumeData}
                        handleSectionChange={handleSectionChange}
                        isPreview={false}
                        setResumeData={setResumeData}
                    />
                );
            case 1:
                return (
                    <ModernTemplate
                        resumeData={resumeData}
                        handleSectionChange={handleSectionChange}
                        isPreview={false}
                        setResumeData={setResumeData}
                    />
                );
            default:
                return <div>naur</div>;
        }
    };

    const toggleSideBarButton = (
        <button
            className="toggle-sidebar-button"
            id="side-bar-toggle-button"
            onClick={openSideBar}
        >
            &#9776;
        </button>
    );

    const toggleTemplates = () => {
        if (currentTemplate == 1) {
            setCurrentTemplate(0);
        } else if (currentTemplate == 0) {
            setCurrentTemplate(1);
        }
    };

    const createResumeSideBar = (
        <div className="create-resume-buttons-container" id="side-bar">
            <button
                className="create-resume-button back-button"
                onClick={handleBack}
            >
                <p>back</p>
                <span className="back-icon icon"></span>
            </button>
            <button className="create-resume-button" onClick={toggleTemplates}>
                <p>Template</p>
                <span className="template-icon icon"></span>
            </button>
            <button className="create-resume-button">
                <p>Sections</p>
                <span className="sections-icon icon"></span>
            </button>
            <button onClick={exportPDF} className="create-resume-button">
                <p>Export</p>
                <span className="export-icon icon"></span>
            </button>
            {isLoadingState ? (
                <button
                    className="create-resume-button save-button"
                    onClick={handleSave}
                >
                    <Loader />
                </button>
            ) : (
                <button
                    className="create-resume-button save-button"
                    onClick={handleSave}
                >
                    <p>Save</p>
                    <span className="save-icon icon"></span>
                </button>
            )}
        </div>
    );

    // if loading
    if (getResumeQuery.isLoading && getResumeQuery.fetchStatus !== "idle") {
        return (
            <div className="create-resume-page-container">
                <div className="create-resume-edit-container">
                    <div className="create-resume-page-right-section">
                        <div className="create-resume-title-container">
                            <input
                                className="resume-title input"
                                ref={titleRef}
                                placeholder="Untitled"
                                onChange={handleResumeTitleChange}
                            ></input>
                            <textarea
                                className="resume-description input"
                                ref={descriptionRef}
                                placeholder="No description..."
                                onChange={handleResumeDescriptionChange}
                            ></textarea>
                        </div>
                        {renderQuestion()}
                        <div className="create-resume-template-container">
                            <ResumeSkeleton />
                        </div>
                    </div>
                    {createResumeSideBar}
                    {toggleSideBarButton}
                </div>
            </div>
        );
    }
    // if error
    if (getResumeQuery.status === "error") return <div>error</div>;
    // if new resume
    if (!!localStorage.getItem("resumeId") === false) {
        return (
            <div className="create-resume-page-container">
                <div className="create-resume-edit-container">
                    <div className="create-resume-page-right-section">
                        <div className="create-resume-title-container">
                            <input
                                className="resume-title input"
                                ref={titleRef}
                                placeholder="Untitled"
                                onChange={handleResumeTitleChange}
                            ></input>
                            <textarea
                                className="resume-description input"
                                ref={descriptionRef}
                                placeholder="No description..."
                                onChange={handleResumeDescriptionChange}
                            ></textarea>
                        </div>
                        {renderSectionSelector()}
                        {renderQuestion()}
                        <div className="create-resume-template-container">
                            {renderTemplate()}
                        </div>
                    </div>
                    {createResumeSideBar}
                    {toggleSideBarButton}
                </div>
            </div>
        );
    }
    // if successful data fetch
    if (!!localStorage.getItem("resumeId")) {
        return (
            <div className="create-resume-page-container">
                <div className="create-resume-edit-container">
                    <div className="create-resume-page-right-section">
                        <div className="create-resume-title-container">
                            <input
                                className="resume-title input"
                                ref={titleRef}
                                placeholder="Untitled"
                                value={resumeTitle}
                                onChange={handleResumeTitleChange}
                            ></input>
                            <textarea
                                className="resume-description input"
                                ref={descriptionRef}
                                placeholder="No description..."
                                value={resumeDescription}
                                onChange={handleResumeDescriptionChange}
                            ></textarea>
                        </div>
                        {renderSectionSelector()}
                        {renderQuestion()}
                        <div className="create-resume-template-container">
                            {renderTemplate()}
                        </div>
                    </div>
                    {createResumeSideBar}
                    {toggleSideBarButton}
                </div>
            </div>
        );
    }
}

export default CreateResume;
