import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const CreateResumeModal = ({ createModal, setCreateModal }) => {
    const navigate = useNavigate();
    // variables needed for creating new resume
    const [resumeTitle, setResumeTitle] = useState("");
    const [resumeJob, setResumeJob] = useState("");
    const [resumeDescription, setResumeDescription] = useState("");

    const navigateCreateResumePage = () => {
        // ensure title, description, and job are filled out
        if (
            resumeTitle === "" ||
            resumeDescription === "" ||
            resumeJob === ""
        ) {
            alert("Please fill out all of the fields.");
            return;
        }
        console.log("create-resume");
        // clear the current resume being stored in local storage
        localStorage.removeItem("resumeId");
        // ensure that there is no "current resume" stored in local storage so that this resume can be stored as a new resume
        console.log(resumeTitle);
        navigate(
            `/u/create-resume/${encodeURIComponent(
                resumeTitle
            )}/${encodeURIComponent(resumeJob)}/${encodeURIComponent(
                resumeDescription
            )}`
        );
    };

    function closeCreateResumeModal() {
        setCreateModal(false);
    }

    function afterOpenModal() {}

    return (
        <Modal
            className="modal"
            isOpen={createModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeCreateResumeModal}
            contentLabel="create-resume-modal"
            overlayClassName="overlay"
        >
            <div className="create-resume-info-container">
                <div className="header">
                    <h2>Resume Information</h2>
                </div>
                <div className="horizontal-container">
                    <h4>Title</h4>
                    <input
                        type="text"
                        value={resumeTitle}
                        placeholder="e.g. Google Junior Developer"
                        onChange={(event) => {
                            setResumeTitle(event.currentTarget.value);
                        }}
                    ></input>
                </div>
                <div className="horizontal-container">
                    <h4>Job</h4>
                    <input
                        type="text"
                        value={resumeJob}
                        placeholder="e.g. Junior Developer"
                        onChange={(event) => {
                            setResumeJob(event.currentTarget.value);
                        }}
                    ></input>
                </div>
                <div className="horizontal-container">
                    <h4>Description</h4>
                    <textarea
                        type="text"
                        rows={3}
                        value={resumeDescription}
                        placeholder="e.g. Resume specialized to highlight full stack development experience."
                        onChange={(event) => {
                            setResumeDescription(event.currentTarget.value);
                        }}
                    ></textarea>
                </div>
                <div className="button-container">
                    <button onClick={closeCreateResumeModal}>Back</button>
                    <button onClick={navigateCreateResumePage}>Next</button>
                </div>
            </div>
        </Modal>
    );
};

export default CreateResumeModal;
