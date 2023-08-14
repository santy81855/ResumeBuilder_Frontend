import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    templateToString,
    templateToInt,
    getTemplateComponent,
} from "../lib/LetterTemplateKeys";
import { exportToPDF } from "../lib/ExportToPDF";
import Modal from "react-modal";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
    createLetter,
    updateLetterById,
    getLetterById,
} from "../api/letter/LetterRequests";
import { ToastContainer, toast } from "react-toastify";
import Loader from "./ui/Loader";
import ResumeSkeleton from "./skeletons/ResumeSkeleton";
import "react-toastify/dist/ReactToastify.css";
import "../styles/CreateResume.css";
import JSONLetterData from "../letter-schema.json";
import MinimalTemplate from "./letter-templates/MinimalTemplate";
import CharmTemplate from "./letter-templates/CharmTemplate";
import ImpactTemplate from "./letter-templates/ImpactTemplate";

import Contact from "./letter-questions/Contact";
import Header from "./letter-questions/Header";
import Greeting from "./letter-questions/Greeting";
import Content from "./letter-questions/Content";
import Closer from "./letter-questions/Closer";

function CreateLetter() {
    // get the resume title and description and job from the route
    const { routeLetterTitle, routeLetterJob, routeLetterDescription } =
        useParams();
    const navigate = useNavigate();
    const [currentTemplate, setCurrentTemplate] = useState(0);
    const [currentlySelectedSection, setCurrentlySelectedSection] =
        useState(null);
    const [showSectionsComponent, setShowSectionsComponent] = useState(false);
    const [summanyModalOpen, setSummanyModalOpen] = useState(false);
    const [isLoadingState, setIsLoading] = useState(false);

    const [letterTitle, setletterTitle] = useState(routeLetterTitle);
    const [letterDescription, setletterDescription] = useState(
        routeLetterDescription
    );
    const [letterJob, setletterJob] = useState(routeLetterJob);

    const [letterData, setLetterData] = useState(JSONLetterData);

    const titleRef = useRef();
    const descriptionRef = useRef();
    const LOADING_TIME = 1000;

    const TOGGLE_SIDEBAR_SIZE = 768;

    useEffect(() => {
        const letterId = localStorage.getItem("letterId");
        // if this is not a new resume
        if (!!letterId) {
            getLetterQuery.refetch();
        }
        // handle resize for the floating menu at the bottom of the page
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getLetterQuery = useQuery({
        queryKey: ["getLetterById"],
        queryFn: getLetterById,
        onSuccess: (data, variables, context) => {
            setLetterData(data.json);
            setletterTitle(data.letterTitle);
            setletterJob(data.jobTitle);
            setletterDescription(data.letterDescription);
            setCurrentTemplate(templateToInt[data.template]);
        },
        onError: (error, variables, context) => {
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

    const createLetterMutation = useMutation({
        mutationFn: createLetter,
        onSuccess: (data, variables, context) => {
            // add resumeId to local storage
            localStorage.setItem("letterId", data._id);
            // wait LOADING_TIME so user has feedback about the process
            setTimeout(function () {
                setIsLoading(false);
                navigate("/u/edit-cover-letter");
            }, LOADING_TIME);
        },
        onError: (error, variables, context) => {
            console.log(error);
            setIsLoading(false);
        },
        enabled: false,
    });

    const updateLetterMutation = useMutation({
        mutationFn: updateLetterById,
        onSuccess: (data, variables, context) => {
            // wait LOADING_TIME so user has feedback about the process
            setTimeout(function () {
                setIsLoading(false);
            }, LOADING_TIME);
        },
        onError: (error, variables, context) => {
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
            toast.info(
                "Please fill out a cover letter title and description.",
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
            return;
        }

        const letterId = localStorage.getItem("letterId");
        setIsLoading(true);
        // if there is a letterId we UPDATE
        if (letterId) {
            updateLetterMutation.mutate({
                letterTitleParam: titleRef.current.value.toString(),
                jobTitleParam: letterTitle,
                // need a job description
                jobDescriptionParam: "random job description",
                letterDescriptionParam: descriptionRef.current.value.toString(),
                templateParam: templateToString[currentTemplate],
                jsonParam: letterData,
            });
            // otherwise // create
        } else {
            createLetterMutation.mutate({
                letterTitleParam: titleRef.current.value.toString(),
                jobTitleParam: routeLetterJob,
                // need a job description
                jobDescriptionParam: "random job description",
                letterDescriptionParam: descriptionRef.current.value.toString(),
                templateParam: templateToString[currentTemplate],
                jsonParam: letterData,
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
        if (window.innerWidth < TOGGLE_SIDEBAR_SIZE) {
            const sideBar = document.getElementById("side-bar");
            const button = document.getElementById("side-bar-toggle-button");

            if (!!sideBar && !!button) {
                sideBar.style.transform = "translateY(0%)";
                sideBar.style.left = "2.5%";
                sideBar.style.bottom = "0.5em";
                button.style.display = "none";
            }
        } else {
            const sideBar = document.getElementById("side-bar");
            const button = document.getElementById("side-bar-toggle-button");
            if (!!sideBar && !!button) {
                sideBar.style.left = "0";
                sideBar.style.bottom = "0";
            }
        }
        document.addEventListener("click", (event) =>
            handleClick(event, window.innerWidth)
        );
    }

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

    const handleBack = () => {
        navigate("/u/resumes");
    };

    const handleletterTitleChange = (event) => {
        setletterTitle(event.target.value);
    };
    const handleletterDescriptionChange = (event) => {
        setletterDescription(event.target.value);
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

    const inputModalProps = {
        letterData: letterData,
        setLetterData: setLetterData,
        handleSave: handleSave,
        closeModal: closeModal,
        isLoadingState: isLoadingState,
        jobTitle: letterJob,
        template: templateToString[currentTemplate],
    };

    const inputModals = [
        <Contact {...inputModalProps} />,
        <Header {...inputModalProps} />,
        <Greeting {...inputModalProps} />,
        <Content {...inputModalProps} />,
        <Closer {...inputModalProps} />,
    ];

    const renderQuestion = () => {
        return (
            <Modal
                className="modal"
                isOpen={summanyModalOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="summary-modal"
                overlayClassName="overlay"
            >
                {inputModals[currentlySelectedSection]}
            </Modal>
        );
    };

    const SectionContainer = () => {
        // get the sections available for the current template
        const sectionArr = Object.entries(
            letterData.templateSections[templateToString[currentTemplate]]
        ).map(([name, field]) => ({ name, show: field }));

        const buttonClick = (event, name, status) => {
            // update the array with the section status switched
            for (var i = 0; i < sectionArr.length; i++) {
                if (sectionArr[i].name === name) {
                    sectionArr[i] = !status;
                }
            }

            // change the button to the opposite color
            status
                ? (event.target.style.backgroundColor = "transparent")
                : (event.target.style.backgroundColor = "rgb(0, 128,128)");

            // update the json file to have the correct info
            const updatedLetterData = { ...letterData };
            updatedLetterData.templateSections[
                templateToString[currentTemplate]
            ][name] = !status;
            setLetterData(updatedLetterData);
        };

        return (
            <div className="section-selection-container">
                {sectionArr.map((item, index) => (
                    <div key={index} className="section-option">
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
                    <MinimalTemplate
                        letterData={letterData}
                        handleSectionChange={handleSectionChange}
                        isPreview={false}
                        setLetterData={setLetterData}
                    />
                );
            case 1:
                return (
                    <CharmTemplate
                        letterData={letterData}
                        handleSectionChange={handleSectionChange}
                        isPreview={false}
                        setLetterData={setLetterData}
                    />
                );
            case 2:
                return (
                    <ImpactTemplate
                        letterData={letterData}
                        handleSectionChange={handleSectionChange}
                        isPreview={false}
                        setLetterData={setLetterData}
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
        if (currentTemplate === 0) {
            setCurrentTemplate(1);
        } else if (currentTemplate === 1) {
            setCurrentTemplate(2);
        } else if (currentTemplate === 2) {
            setCurrentTemplate(0);
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
                    }}
                >
                    <p>Sections</p>
                    <span className="sections-icon icon"></span>
                </button>
                <button
                    onClick={() => {
                        exportToPDF({
                            content:
                                document.getElementById("template-to-print"),
                            fileName: letterTitle,
                        });
                    }}
                    className="create-resume-button"
                >
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
    if (getLetterQuery.isLoading && getLetterQuery.fetchStatus !== "idle") {
        return (
            <div className="create-resume-page-container">
                <div className="create-resume-edit-container">
                    <div className="create-resume-page-right-section">
                        <div className="create-resume-title-container">
                            <input
                                className="resume-title input"
                                ref={titleRef}
                                placeholder="Untitled"
                                onChange={handleletterTitleChange}
                                title="title"
                            ></input>
                            <textarea
                                className="resume-description input"
                                ref={descriptionRef}
                                placeholder="No description..."
                                onChange={handleletterDescriptionChange}
                                title="description"
                            ></textarea>
                        </div>
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
    else if (getLetterQuery.status === "error") return <div>error</div>;
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
                                value={letterTitle}
                                onChange={handleletterTitleChange}
                                title="title"
                            ></input>
                            <textarea
                                className="resume-description input"
                                ref={descriptionRef}
                                placeholder="No description..."
                                value={letterDescription}
                                onChange={handleletterDescriptionChange}
                                title="description"
                            ></textarea>
                        </div>
                        {showSectionsComponent && <SectionContainer />}
                        {renderQuestion()}
                        <div className="create-resume-template-container">
                            {renderTemplate()}
                        </div>
                    </div>
                    <CreateResumeSideBar />
                    <ToastContainer />
                    {toggleSideBarButton}
                </div>

                <div className="hidden-template">
                    {getTemplateComponent({
                        json: letterData,
                        isPreview: false,
                        handleSectionChange: () => {},
                        template: templateToString[currentTemplate],
                        isExport: true,
                    })}
                </div>
            </div>
        );
    }
}

export default CreateLetter;
