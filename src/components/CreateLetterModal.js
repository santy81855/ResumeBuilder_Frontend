import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation, Trans } from "react-i18next";

const CreateLetterModal = ({ createModal, setCreateModal }) => {
    const { i18n, t } = useTranslation();
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

            return;
        }
        // clear the current resume being stored in local storage
        localStorage.removeItem("letterId");
        // ensure that there is no "current resume" stored in local storage so that this resume can be stored as a new resume
        navigate(
            `/u/create-cover-letter/${encodeURIComponent(
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
                    <h2>{t("createCoverLetterModal.heading")}</h2>
                </div>
                <div className="info-page">
                    <div className="horizontal-container">
                        <h4>{t("createCoverLetterModal.title")}</h4>
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
                        <h4>{t("createCoverLetterModal.job")}</h4>
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
                        <h4>{t("createCoverLetterModal.description")}</h4>
                        <textarea
                            type="text"
                            rows={3}
                            value={resumeDescription}
                            placeholder="e.g. Cover Letter to highlight full stack development experience."
                            onChange={(event) => {
                                setResumeDescription(event.currentTarget.value);
                            }}
                        ></textarea>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={closeCreateResumeModal}>
                        {t("createCoverLetterModal.back")}
                    </button>
                    <button onClick={navigateCreateResumePage}>
                        {t("createCoverLetterModal.next")}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </Modal>
    );
};

export default CreateLetterModal;
