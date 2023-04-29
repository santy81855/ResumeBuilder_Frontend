import React, { useState } from "react";
import "../styles/CreateResume.css";

import BasicInfo from "./questions/BasicInfo";
import Summary from "./questions/Summary";

import JSONResumeData from "../resume-schema.json";
import CleanTemplate from "./templates/CleanTemplate";

import Modal from "react-modal";

import { savePDF } from "@progress/kendo-react-pdf";

function CreateResume() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [currentTemplate, setCurrentTemplate] = useState(1);
    const [currentlySelectedSection, setCurrentlySelectedSection] =
        useState(null);

    const [resumeData, setResumeData] = useState(JSONResumeData); // lifted state

    const customStyles = {
        content: {
            top: "10%",
            left: "10%",
            right: "10%",
            bottom: "10%",
            overflow: "scroll",
        },
    };

    let title;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {}

    function closeModal() {
        setIsOpen(false);
    }

    const handleNext = () => {
        setCurrentQuestion(currentQuestion + 1);
    };

    const handlePrev = () => {
        setCurrentQuestion(currentQuestion - 1);
    };

    const handleResumeDataChange = (newResumeData) => {
        // callback function to update the resumeData state
        setResumeData(newResumeData);
    };

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
                fontSize: 12,
            },
        });
    };

    const renderQuestion = () => {
        switch (currentlySelectedSection) {
            case 1:
                return (
                    <BasicInfo
                        resumeData={resumeData}
                        handleNext={handleNext}
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
                            handleNext={handleNext}
                            closeModal={closeModal}
                            currentlySelectedSection={currentlySelectedSection}
                            onResumeDataChange={handleResumeDataChange} // passing down the callback function as props
                            handlePrev={handlePrev}
                        />
                    </Modal>
                );
            case 3:
                return (
                    <Summary
                        resumeData={resumeData}
                        handleNext={handleNext}
                        currentlySelectedSection={currentlySelectedSection}
                        onResumeDataChange={handleResumeDataChange} // passing down the callback function as props
                        handlePrev={handlePrev}
                    />
                );
            default:
                return null;
        }
    };
    const renderTemplate = () => {
        switch (currentTemplate) {
            case 1:
                return (
                    <CleanTemplate
                        resumeData={resumeData}
                        handleSectionChange={handleSectionChange}
                        isPreview={false}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="create-resume-page-container">
            <div className="create-resume-title-container">
                <input placeholder="Untitled" className="resume-title"></input>
                <textarea
                    placeholder="No description..."
                    className="resume-description"
                ></textarea>
            </div>

            {renderQuestion()}
            <div className="create-resume-template-section">
                <div className="create-resume-template-container">
                    {renderTemplate()}
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
                    <button className="create-resume-button save-button">
                        <p>Save</p>
                        <span className="save-icon"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateResume;
