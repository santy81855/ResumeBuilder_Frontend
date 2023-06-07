import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateResume.css";

import Loader from "./ui/Loader";
import BasicInfo from "./questions/BasicInfo";
import Summary from "./questions/Summary";
import ContactInfo from "./questions/ContactInfo";
import TitleInfo from "./questions/TitleInfo";
import SkillsInfo from "./questions/SkillsInfo";
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
    const [showSectionsComponent, setShowSectionsComponent] = useState(false);

    const [resumeData, setResumeData] = useState(JSONResumeData); // lifted state
    const [summanyModalOpen, setSummanyModalOpen] = useState(false);
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

    const flashError = (title, description) => {
        if (title.value === "" && description.value === "") {
            title.style.border = "2px solid";
            description.style.border = "2px solid";
            title.classList.add("flash-animation");
            description.classList.add("flash-animation");
        } else if (title.value === "") {
            title.style.border = "2px solid";
            title.classList.add("flash-animation");
        } else {
            description.style.border = "2px solid";
            description.classList.add("flash-animation");
        }
        setTimeout(function () {
            title.classList.remove("flash-animation");
            description.classList.remove("flash-animation");
            title.style.border = "none";
            description.style.border = "none";
        }, 1500); // Adjust the duration based on the animation duration and number of repetitions
    };

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
        // if there is no title or description we flash an error
        if (
            titleRef.current.value === "" ||
            descriptionRef.current.value === ""
        ) {
            flashError(titleRef.current, descriptionRef.current);
            return;
        }

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
        setSummanyModalOpen(true);
    }

    function afterOpenModal() {}

    function closeModal() {
        setSummanyModalOpen(false);
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
                        isOpen={summanyModalOpen}
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
                    <Modal
                        className="modal"
                        isOpen={summanyModalOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="summary-modal"
                        overlayClassName="overlay"
                    >
                        <ContactInfo
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleSave={handleSave}
                            closeModal={closeModal}
                            isLoadingState={isLoadingState}
                        />
                    </Modal>
                );
            case 4:
                return (
                    <Modal
                        className="modal"
                        isOpen={summanyModalOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="summary-modal"
                        overlayClassName="overlay"
                    >
                        <TitleInfo
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleSave={handleSave}
                            closeModal={closeModal}
                            isLoadingState={isLoadingState}
                        />
                    </Modal>
                );
            case 5:
                return (
                    <Modal
                        className="modal"
                        isOpen={summanyModalOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        contentLabel="summary-modal"
                        overlayClassName="overlay"
                    >
                        <SkillsInfo
                            resumeData={resumeData}
                            setResumeData={setResumeData}
                            handleSave={handleSave}
                            closeModal={closeModal}
                            isLoadingState={isLoadingState}
                        />
                    </Modal>
                );
            default:
                return null;
        }
    };

    const SectionContainer = () => {
        console.log(getResumeQuery);
        // get the sections available for the current template

        const sectionArr = Object.entries(
            resumeData.templateSections[templateToString[currentTemplate]]
        ).map(([name, field]) => ({ name, show: field.show }));

        console.log(sectionArr);

        const buttonClick = (event, name, status) => {
            console.log(resumeData);
            // update the array with the section status switched
            for (var i = 0; i < sectionArr.length; i++) {
                if (sectionArr[i].name === name) {
                    sectionArr[i].show = !status;
                }
            }

            // change the button to the opposite color
            status
                ? (event.target.style.backgroundColor = "transparent")
                : (event.target.style.backgroundColor = "rgb(0, 128,128)");

            // update the json file to have the correct info
            const updatedResumeData = { ...resumeData };
            updatedResumeData.templateSections[
                templateToString[currentTemplate]
            ][name].show = !status;
            setResumeData(updatedResumeData);
        };

        return (
            <div className="section-selection-container">
                {sectionArr.map((item, index) => (
                    <div className="section-option">
                        {item.show ? (
                            <div
                                className="section-checkbox-true"
                                onClick={(event) =>
                                    buttonClick(event, item.name, item.show)
                                }
                            ></div>
                        ) : (
                            <div
                                className="section-checkbox-false"
                                onClick={(event) =>
                                    buttonClick(event, item.name, item.show)
                                }
                            ></div>
                        )}
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        );
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
        // hide sections component so that it can be updated to match the new template when we open it again
        setShowSectionsComponent(false);
        if (currentTemplate == 1) {
            setCurrentTemplate(0);
        } else if (currentTemplate == 0) {
            setCurrentTemplate(1);
        }
    };

    const CreateResumeSideBar = () => {
        return (
            <div className="create-resume-buttons-container" id="side-bar">
                <button
                    className="create-resume-button back-button"
                    onClick={handleBack}
                >
                    <p>back</p>
                    <span className="back-icon icon"></span>
                </button>
                <button
                    className="create-resume-button"
                    onClick={toggleTemplates}
                >
                    <p>Template</p>
                    <span className="template-icon icon"></span>
                </button>
                <button
                    className="create-resume-button"
                    onClick={() => {
                        setShowSectionsComponent(!showSectionsComponent);
                        console.log(showSectionsComponent);
                    }}
                >
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
    };

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
                    <CreateResumeSideBar />
                </div>
            </div>
        );
    }
    // if error
    else if (getResumeQuery.status === "error") return <div>error</div>;
    // if new resume or fetched resume
    else {
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
                        {showSectionsComponent && <SectionContainer />}
                        {renderQuestion()}
                        <div className="create-resume-template-container">
                            {renderTemplate()}
                        </div>
                    </div>
                    <CreateResumeSideBar />
                    {toggleSideBarButton}
                </div>
            </div>
        );
    }
}

export default CreateResume;
