import React, { useState } from "react";
import "../styles/CreateResume.css";

import BasicInfo from "./questions/BasicInfo";
import Summary from "./questions/Summary";

import JSONResumeData from "../resume-schema.json";
import CleanTemplate from "./templates/CleanTemplate";

import Modal from "react-modal";

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
            {renderQuestion()}
            <div className="input-chat-container">
                <div className="resume-chatbox"></div>
            </div>
            <div className="create-resume-template-container">
                {renderTemplate()}
            </div>
        </div>
    );
}

export default CreateResume;
