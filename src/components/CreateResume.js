import React, { useState, useRef, useEffect } from "react";
import "../styles/CreateResume.css";

import BasicInfo from "./questions/BasicInfo";
import Summary from "./questions/Summary";

import JSONResumeData from "../resume-schema.json";
import CleanTemplate from "./templates/CleanTemplate";

import Modal from "react-modal";

import { savePDF } from "@progress/kendo-react-pdf";

import { useQuery, useMutation } from "@tanstack/react-query";

import {
    createResume,
    updateResumeById,
    getResumeById,
} from "../api/resume/ResumeRequests";

function CreateResume() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [currentTemplate, setCurrentTemplate] = useState(1);
    const [currentlySelectedSection, setCurrentlySelectedSection] =
        useState(null);

    const [resumeData, setResumeData] = useState(
        !!sessionStorage.getItem("resumeData")
            ? JSONResumeData
            : sessionStorage.getItem("resumeData")
    ); // lifted state

    const [modalIsOpen, setIsOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    // example of how to modify
    // modifiedData.basics.name = "John Doe";

    //--------------------------------------//
    const titleRef = useRef();
    const descriptionRef = useRef();
    const LOADING_TIME = 1000;

    const getResumeQuery = useQuery({
        queryKey: ["getResumeById"],
        queryFn: getResumeById,
        onSuccess: (data, variables, context) => {
            console.log(
                "Just fetched resume data in CreateResume component. Data: "
            );
            console.log(data);
        },
        onError: (error, variables, context) => {
            console.log(
                "Error Fetching resumes in CreateResume component. Error: "
            );
            console.log(error);
        },
        enabled: !!localStorage.getItem("resumeId"),
    });

    // useeffect hook to ensure that the correct title and description are showed on refresh
    useEffect(() => {
        const resumeId = localStorage.getItem("resumeId");
        // if we are editing a resume then fetch the data
        if (resumeId) {
            if (getResumeQuery.status === "success") {
                titleRef.current.value = getResumeQuery.data.resumeTitle;
                descriptionRef.current.value =
                    getResumeQuery.data.resumeDescription;
                setResumeData(getResumeQuery.data.json);
            }
        }
    }, [getResumeQuery.status]);

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
            }, LOADING_TIME);
            //console.log(context);
            //console.log(variables);
        },
        onError: (error, variables, context) => {
            console.log(
                "Problem Creating Resume in CreateResume component. Error: "
            );
            console.log(error);
        },
        onMutate: (variables) => {
            return { hello: "goodbye" };
        },
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
        },
        onMutate: (variables) => {
            return { hi: "bye" };
        },
    });

    function handleSave() {
        const resumeId = localStorage.getItem("resumeId");
        console.log(resumeId);
        setIsLoading(true);
        // if there is a resumeId we UPDATE
        if (resumeId) {
            updateResumeMutation.mutate({
                resumeTitleParam: titleRef.current.value.toString(),
                resumeDescriptionParam: descriptionRef.current.value.toString(),
                jsonParam: resumeData,
            });
            // otherwise // create
        } else {
            console.log(resumeData);
            if (
                resumeData.templates.some((obj) => obj.name === "Clean") ===
                false
            ) {
                console.log("adding template");
                const newTemplate = {
                    name: "Clean",
                    availableSections: [
                        {
                            name: "contact",
                            used: true,
                        },
                        {
                            name: "summary",
                            used: true,
                        },
                        {
                            name: "skills",
                            used: true,
                        },
                        {
                            name: "work",
                            used: true,
                        },
                        {
                            name: "education",
                            used: true,
                        },
                        {
                            name: "languages",
                            used: true,
                        },
                        {
                            name: "interests",
                            used: true,
                        },
                    ],
                };
                setResumeData({
                    ...resumeData,
                    templates: [...resumeData.templates, newTemplate],
                });
            }
            createResumeMutation.mutate({
                resumeTitleParam: titleRef.current.value.toString(),
                resumeDescriptionParam: descriptionRef.current.value.toString(),
                jsonParam: resumeData,
            });
        }
    }
    //--------------------------------------//
    const handleResumeDataChange = (newResumeData) => {
        // callback function to update the resumeData state
        setResumeData(newResumeData);
        console.log(newResumeData);
        console.log(resumeData);
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
        setIsOpen(true);
        setCurrentlySelectedSection(selectedSection);
    };

    const exportPDF = () => {
        const content = document.getElementById("template");
        savePDF(content, {
            paperSize: "Letter",
            margin: 0,
            fileName: "resume.pdf",
            landscape: false,
            pdf: {
                multiPage: false,
                font: "Arial",
            },
        });
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
                            isLoading={isLoading}
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

    const templateArr = () => {};

    const renderTemplate = () => {
        switch (currentTemplate) {
            case 1:
                return (
                    <CleanTemplate
                        resumeData={resumeData}
                        handleSectionChange={handleSectionChange}
                        isPreview={false}
                        setResumeData={setResumeData}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="create-resume-page-container">
            <div className="create-resume-edit-container">
                <div className="create-resume-page-left-section">
                    <div className="create-resume-title-container">
                        <input
                            className="resume-title"
                            ref={titleRef}
                            placeholder="Untitled"
                        ></input>
                        <textarea
                            className="resume-description"
                            ref={descriptionRef}
                            placeholder="No description..."
                        ></textarea>
                    </div>

                    {renderQuestion()}
                    <div className="create-resume-template-container">
                        {renderTemplate()}
                    </div>
                </div>
                <div className="create-resume-buttons-container">
                    <button className="create-resume-button">
                        <p>Template</p>
                        <span className="template-icon"></span>
                    </button>
                    <button className="create-resume-button">
                        <p>Sections</p>
                        <span className="sections-icon"></span>
                    </button>
                    <button
                        onClick={exportPDF}
                        className="create-resume-button"
                    >
                        <p>Export</p>
                        <span className="export-icon"></span>
                    </button>
                    {isLoading ? (
                        <button className="create-resume-button save-button">
                            <p>Saving...</p>
                            <span className="save-icon"></span>
                        </button>
                    ) : (
                        <button
                            className="create-resume-button save-button"
                            onClick={handleSave}
                        >
                            <p>Save</p>
                            <span className="save-icon"></span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateResume;
