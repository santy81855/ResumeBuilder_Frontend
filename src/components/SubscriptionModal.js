import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation, Trans } from "react-i18next";

const SubscriptionModal = ({
    subscriptionModal,
    setSubscriptionModal,
    user,
    createCheckoutSession,
    setCreateModal,
    resumes,
    letters,
}) => {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    // Inside your component
    const location = useLocation();
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
            if (resumes.length >= 1 || letters.length >= 1) {
                if (location.pathname === "/u/resumes") {
                    window.location.reload();
                } else {
                    navigate("/u/resumes");
                }
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
                    <h2>{t("subscriptionModal.heading")}</h2>
                </div>
                <div className="subscription-container">
                    <div
                        className="subscription"
                        ref={freeRef}
                        onClick={() => {
                            optionSelected("free");
                        }}
                    >
                        <h3>{t("subscriptionModal.freeTitle")}</h3>
                        <p>{t("subscriptionModal.freeDescription")}</p>
                        <ul>
                            <div className="li-container">
                                <li>{t("subscriptionModal.freeFeature1")}</li>
                                <li>{t("subscriptionModal.freeFeature2")}</li>
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
                        <h3>{t("subscriptionModal.proTitle")}</h3>
                        <p>{t("subscriptionModal.proDescription")}</p>
                        <ul>
                            <div className="li-container">
                                <li>{t("subscriptionModal.proFeature1")}</li>
                                <li>{t("subscriptionModal.proFeature2")}</li>
                                <li>{t("subscriptionModal.proFeature3")}</li>
                                <li>{t("subscriptionModal.proFeature4")}</li>
                                <li>{t("subscriptionModal.proFeature5")}</li>
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={closeCreateResumeModal}>
                        {t("subscriptionModal.back")}
                    </button>
                    <button
                        onClick={() => {
                            nextClicked();
                        }}
                    >
                        {t("subscriptionModal.next")}
                    </button>
                </div>
            </div>
            <ToastContainer />
        </Modal>
    );
};

export default SubscriptionModal;
