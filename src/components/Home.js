import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom"; // go to another page when you click "Create-Resume button on homepage"
import { TypeAnimation } from "react-type-animation";
import CreateResumeModal from "./CreateResumeModal";
import SubscriptionModal from "./SubscriptionModal";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/user/UserRequests";
import { getAllUserResumes } from "../api/resume/ResumeRequests";
import { getSubscription } from "../api/subscription/SubscriptionRequests";
import { createCheckoutSession } from "../api/stripe/StripeRequests";
import Footer from "./Footer";
import { useTranslation, Trans } from "react-i18next";
import { useAppState } from "../AppStateContext";

function Home() {
    const { i18n, t } = useTranslation();
    const [createModal, setCreateModal] = useState(false);
    const [resumes, setResumes] = useState(null);
    const [subscriptionModal, setSubscriptionModal] = useState(false);
    const [enhanceText, setEnhanceText] = useState(
        t("homepage.section3ContentBefore")
    );
    const { appState, setAppState } = useAppState();
    const navigate = useNavigate();

    // useEffect to fetch user data on load
    useEffect(() => {
        const token = localStorage.getItem("token");
        // if there is a user logged in get the user info
        if (token) {
            // get user info
            getUserQuery.refetch();
            resumesQuery.refetch();
        }
    }, []);

    useEffect(() => {
        // wait 2 seconds
        setTimeout(() => {
            // set the enhance text to the first language
            setEnhanceText(t("homepage.section3ContentBefore"));
        }, 2000);
    }, [appState]);

    const createResumeHomeClick = () => {
        const token = localStorage.getItem("token");
        if (token) {
            // if the user has a subscription just proceed as normal
            if (subscriptionQuery.data?.length === 1) {
                setCreateModal(true);
            }
            // if the user has no subscription
            else {
                // if they haven't created their free resume yet
                if (resumesQuery.data?.length === 0) {
                    setCreateModal(true);
                } else if (resumesQuery.data?.length > 0) {
                    // they have already created a free resume show the subscription dialogue
                    setSubscriptionModal(true);
                } else {
                    setSubscriptionModal(true);
                }
            }
        } else {
            navigate("/login");
        }
    };

    const getUserQuery = useQuery({
        queryKey: ["getUserByToken"],
        queryFn: getUser,
        onSuccess: (data, variables, context) => {},
        onError: (error, variables, context) => {},
        enabled: false,
    });

    const subscriptionQuery = useQuery({
        queryKey: ["getSubscription"],
        queryFn: getSubscription,
        onSuccess: (data, variables, context) => {},
        onError: (error, variables, context) => {},
        enabled: localStorage.getItem("token") ? true : false,
    });

    const resumesQuery = useQuery({
        queryKey: ["getAllUserResumes"],
        queryFn: getAllUserResumes,
        onSuccess: (data, variables, context) => {
            setResumes(data);
        },
        onError: (error, variables, context) => {},
        enabled: localStorage.getItem("token") ? true : false,
    });

    return (
        <div className="landing-page">
            <Helmet>
                <title>
                    AI Resume - An Artificial Intelligence Resume Builder
                </title>
                <meta
                    name="description"
                    content="Create your perfect resume in minutes with the help of AI."
                />
            </Helmet>
            <div className="landing-page-background">
                <div className="content-container">
                    <p className="landing-page-title-banner">
                        <span>{t("homepage.banner")}</span>
                    </p>
                    <h1>
                        <Trans i18nKey="homepage.title">
                            Create your perfect resume in <span>minutes</span>
                            with the help of <span>AI.</span>
                        </Trans>
                    </h1>
                    <p className="landing-page-description">
                        {t("homepage.description")}
                    </p>

                    <button
                        className="btn btn-one"
                        onClick={() => {
                            createResumeHomeClick();
                        }}
                    >
                        <span>{t("homepage.button")}</span>
                    </button>
                </div>
                <div className="circle-transition"></div>
            </div>
            <div className="feature-list">
                <div className="left-feature-wrapper">
                    <div className="left-feature-container">
                        <div className="feature-left">
                            <div className="feature-text-section">
                                <p className="header">
                                    {t("homepage.section1Title")}
                                </p>
                                <p className="body">
                                    {t("homepage.section1Description")}
                                </p>
                            </div>
                            <div className="feature-image-section">
                                <div className="step-one-image">
                                    <div className="step-one-header">
                                        {t("homepage.section1ImageHeader")}
                                    </div>
                                    <div className="step-one-body">
                                        <div className="step-one-element">
                                            <p>
                                                {t(
                                                    "homepage.section1ImageLine1"
                                                )}
                                            </p>
                                            <div className="type-input-wrapper">
                                                <TypeAnimation
                                                    className="type-input"
                                                    sequence={[
                                                        // Same substring at the start will only be typed out once, initially
                                                        "Microsoft Resume",
                                                        1000,
                                                        "Google Resume",
                                                        1000,
                                                        "Apple Resume",
                                                        1000,
                                                        "Meta Resume",
                                                        1000,
                                                    ]}
                                                    wrapper="span"
                                                    speed={50}
                                                    repeat={Infinity}
                                                />
                                            </div>
                                        </div>
                                        <div className="step-one-element">
                                            <p>
                                                {t(
                                                    "homepage.section1ImageLine2"
                                                )}
                                            </p>
                                            <div className="type-input-wrapper">
                                                <TypeAnimation
                                                    className="type-input"
                                                    sequence={[
                                                        // Same substring at the start will only be typed out once, initially
                                                        "Highlight Backend Experience",
                                                        1000,
                                                        "Highlight Frontend Experience",
                                                        1000,
                                                        "Highlight Fullstack Experience",
                                                        1000,
                                                        "Highlight Data Science Experience",
                                                        1000,
                                                    ]}
                                                    wrapper="span"
                                                    speed={50}
                                                    repeat={Infinity}
                                                />
                                            </div>
                                        </div>
                                        <div className="step-one-element">
                                            <p>
                                                {t(
                                                    "homepage.section1ImageLine3"
                                                )}
                                            </p>
                                            <div className="type-input-wrapper">
                                                <TypeAnimation
                                                    className="type-input"
                                                    sequence={[
                                                        // Same substring at the start will only be typed out once, initially
                                                        "Junior Software Engineer",
                                                        1000,
                                                        "Senior Python Developer",
                                                        1000,
                                                        "Mechanical Engineer",
                                                        1000,
                                                        "Data Scientist",
                                                        1000,
                                                    ]}
                                                    wrapper="span"
                                                    speed={50}
                                                    repeat={Infinity}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-feature-wrapper">
                    <div className="right-feature-container">
                        <div className="feature-right">
                            <div className="feature-text-section">
                                <p className="header">
                                    {t("homepage.section2Title")}
                                </p>
                                <div className="feature-image-section">
                                    <div className="step2"></div>
                                </div>
                                <p className="body">
                                    {t("homepage.section2Description")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-feature-wrapper-last">
                    <div className="right-feature-container">
                        <div className="feature-right-last">
                            <div className="feature-text-section-last">
                                <p className="header">
                                    {t("homepage.section3Title")}
                                </p>
                                <p className="body">
                                    {t("homepage.section3Description")}
                                </p>
                                <p className="body">
                                    {t("homepage.section3Description2")}
                                </p>
                                <div className="feature-image-section-last">
                                    <div className="step3">
                                        <div className="step3-box">
                                            <p>{enhanceText}</p>
                                        </div>
                                        <button
                                            className="enhance-button"
                                            onClick={() => {
                                                setTimeout(function () {
                                                    setEnhanceText(
                                                        t(
                                                            "homepage.section3ContentAfter"
                                                        )
                                                    );
                                                    setTimeout(function () {
                                                        setEnhanceText(
                                                            t(
                                                                "homepage.section3ContentBefore"
                                                            )
                                                        );
                                                    }, 15000);
                                                }, 1000);
                                            }}
                                        >
                                            {t("homepage.section3Enhance")}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateResumeModal
                createModal={createModal}
                setCreateModal={setCreateModal}
            />
            <SubscriptionModal
                subscriptionModal={subscriptionModal}
                setSubscriptionModal={setSubscriptionModal}
                user={getUserQuery.data?.user}
                createCheckoutSession={createCheckoutSession}
                setCreateModal={setCreateModal}
                resumes={resumes}
            />
            <Footer />
        </div>
    );
}

export default Home;
