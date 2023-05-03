import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateResume.css";

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

import { savePDF } from "@progress/kendo-react-pdf";

import { useQuery, useMutation } from "@tanstack/react-query";

import {
    createResume,
    updateResumeById,
    getResumeById,
} from "../api/resume/ResumeRequests";

function CreateResume() {
    const navigate = useNavigate();
    const [currentTemplate, setCurrentTemplate] = useState(1);
    const [currentlySelectedSection, setCurrentlySelectedSection] =
        useState(null);

    const [resumeData, setResumeData] = useState(JSONResumeData); // lifted state
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoadingState, setIsLoading] = useState(false);

    const [resumeTitle, setResumeTitle] = useState("");
    const [resumeDescription, setResumeDescription] = useState("");

    //--------------------------------------//
    const titleRef = useRef();
    const descriptionRef = useRef();
    const LOADING_TIME = 1000;

    /*
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
    */

    const getResumeQuery = useQuery({
        queryKey: ["getResumeById"],
        queryFn: getResumeById,
        onSuccess: (data, variables, context) => {
            console.log(
                "Just fetched resume data in CreateResume component. Data: "
            );
            setResumeData(data.json);
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

    useEffect(() => {
        const resumeId = localStorage.getItem("resumeId");
        console.log(getResumeQuery);
        // if this is not a new resume
        if (!!resumeId) {
            getResumeQuery.refetch();
        }
    }, []);

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
        },
        onMutate: (variables) => {
            return { hi: "bye" };
        },
    });

    function handleSave() {
        const resumeId = localStorage.getItem("resumeId");
        console.log(resumeId);
        setIsLoading(true);
        console.log(templateToString[currentTemplate]);
        // if there is a resumeId we UPDATE
        if (resumeId) {
            console.log(resumeData);
            updateResumeMutation.mutate({
                resumeTitleParam: titleRef.current.value.toString(),
                resumeDescriptionParam: descriptionRef.current.value.toString(),
                templateParam: templateToString[currentTemplate],
                jsonParam: resumeData,
            });
            // otherwise // create
        } else {
            console.log(resumeData);
            createResumeMutation.mutate({
                resumeTitleParam: titleRef.current.value.toString(),
                resumeDescriptionParam: descriptionRef.current.value.toString(),
                templateParam: templateToString[currentTemplate],
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
        const content = document.getElementById(
            templateNameToExport[currentTemplate]
        );
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

    const handleBack = () => {
        navigate("/u/resumes");
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

    const createResumeSideBar = (
        <div className="create-resume-buttons-container">
            <button className="create-resume-button">
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
            <button
                className="create-resume-button back-button"
                onClick={handleBack}
            >
                <p>back</p>
                <span className="back-icon icon"></span>
            </button>
            {isLoadingState ? (
                <button className="create-resume-button save-button">
                    <div className="loader"></div>
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

    const handleResumeTitleChange = (event) => {
        setResumeTitle(event.target.value);
    };
    const handleResumeDescriptionChange = (event) => {
        setResumeDescription(event.target.value);
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
                    {createResumeSideBar}
                </div>
            </div>
        );
    }
    // if error
    if (getResumeQuery.status === "error") return <div>error</div>;
    // if new resume
    if (!!localStorage.getItem("resumeId") === false) {
        console.log(!!localStorage.getItem("resumeId"));
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
                            {renderTemplate()}
                        </div>
                    </div>
                    {createResumeSideBar}
                </div>
            </div>
        );
    }
    // if successful data fetch
    if (getResumeQuery.isSuccess) {
        console.log(!!localStorage.getItem("resumeId"));
        return (
            <div className="create-resume-page-container">
                <div className="create-resume-edit-container">
                    <div className="create-resume-page-right-section">
                        <div className="create-resume-title-container">
                            <input
                                className="resume-title input"
                                ref={titleRef}
                                placeholder="Untitled"
                                value={getResumeQuery.data.resumeTitle}
                                onChange={handleResumeTitleChange}
                            ></input>
                            <textarea
                                className="resume-description input"
                                ref={descriptionRef}
                                placeholder="No description..."
                                value={getResumeQuery.data.resumeDescription}
                                onChange={handleResumeDescriptionChange}
                            ></textarea>
                        </div>

                        {renderQuestion()}
                        <div className="create-resume-template-container">
                            {renderTemplate()}
                        </div>
                    </div>
                    {createResumeSideBar}
                </div>
            </div>
        );
    }
}

export default CreateResume;
