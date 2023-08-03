import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SubscriptionModal = ({
    subscriptionModal,
    setSubscriptionModal,
    user,
    createCheckoutSession,
    setCreateModal,
    resumes,
}) => {
    const navigate = useNavigate();
    const [selection, setSelection] = useState("pro");
    const freeRef = useRef(null);
    const proRef = useRef(null);

    function closeCreateResumeModal() {
        setSubscriptionModal(false);
    }

    function afterOpenModal() {}

    function optionSelected(type) {
        if (type === "free") {
            freeRef.current.style.backgroundColor = "lightgrey";
            proRef.current.style.backgroundColor = "white";
            setSelection("free");
        }
        if (type === "pro") {
            proRef.current.style.backgroundColor = "lightgrey";
            freeRef.current.style.backgroundColor = "white";
            setSelection("pro");
        }
    }

    const nextClicked = () => {
        if (selection === "free") {
            // if they already have their 1 free resume take them to the dashboard
            if (resumes.length >= 1) {
                navigate("/u/resumes");
            } else {
                // open the create resume modal and close this modal
                setCreateModal(true);
                setSubscriptionModal(false);
            }
        } else {
            createCheckoutSession(user);
        }
    };

    return (
        <Modal
            className="modal"
            isOpen={subscriptionModal}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeCreateResumeModal}
            contentLabel="create-resume-modal"
            overlayClassName="overlay"
        >
            <div className="create-resume-info-container">
                <div className="header">
                    <h2>Subscribe to unlock all of the features</h2>
                </div>
                <div className="subscription-container">
                    <div
                        className="subscription"
                        ref={freeRef}
                        onClick={() => {
                            optionSelected("free");
                        }}
                    >
                        <h3>AI Resume - Free</h3>
                        <p>See what AI Resume has to offer.</p>
                        <ul>
                            <div className="li-container">
                                <li>Create 1 Resume</li>
                            </div>
                        </ul>
                    </div>
                    <div
                        className="subscription"
                        ref={proRef}
                        onClick={() => {
                            optionSelected("pro");
                        }}
                        style={{ backgroundColor: "lightgrey" }}
                    >
                        <h3>AI Resume Pro - $4.99/month</h3>
                        <p>
                            Experience everything that AI Resume has to offer.
                        </p>
                        <ul>
                            <div className="li-container">
                                <li>Create unlimited resumes</li>
                                <li>Unlock every resume template</li>
                                <li>
                                    Unlimited help from artificial intelligence
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={closeCreateResumeModal}>Back</button>
                    <button
                        onClick={() => {
                            nextClicked();
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
            <ToastContainer />
        </Modal>
    );
};

export default SubscriptionModal;
