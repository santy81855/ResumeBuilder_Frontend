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

function Home() {
    const [createModal, setCreateModal] = useState(false);
    const [subscriptionModal, setSubscriptionModal] = useState(false);
    const [enhanceText, setEnhanceText] = useState(
        "Hard working person who works well in teams and learns fast."
    );
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

    const createResumeHomeClick = () => {
        const token = localStorage.getItem("token");
        if (token) {
            console.log(resumesQuery.data);
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
                    // they have already created a free resume
                    console.log("show subscription only modal");
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
    });

    const resumesQuery = useQuery({
        queryKey: ["getAllUserResumes"],
        queryFn: getAllUserResumes,
        onSuccess: (data, variables, context) => {},
        onError: (error, variables, context) => {},
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
                        <span>Artificial Intelligence Resume Builder</span>
                    </p>
                    <h1>
                        Create your perfect resume in <span>minutes</span> with
                        the help of <span>AI.</span>
                    </h1>
                    <p className="landing-page-description">
                        Say goodbye to endless hours spent perfecting your
                        resume - with Ai Resume, our AI-powered platform makes
                        creating a professional resume fast and easy - Try it
                        now!
                    </p>

                    <button
                        className="btn btn-one"
                        onClick={() => {
                            createResumeHomeClick();
                        }}
                    >
                        <span> Create Your Resume</span>
                    </button>
                </div>
                <div className="circle-transition"></div>
            </div>
            <div className="feature-list">
                <div className="left-feature-wrapper">
                    <div className="left-feature-container">
                        <div className="feature-left">
                            <div className="feature-text-section">
                                <p className="header">Tailor each resume</p>
                                <p className="body">
                                    Our user-friendly interface allows you to
                                    effortlessly craft unique resumes that
                                    perfectly match the requirements of each
                                    opportunity. It's as simple as filling in
                                    the essential details - title, description,
                                    and job - to create a standout resume that
                                    showcases your skills and experience
                                </p>
                            </div>
                            <div className="feature-image-section">
                                <div className="step-one-image">
                                    <div className="step-one-header">
                                        Resume Information
                                    </div>
                                    <div className="step-one-body">
                                        <div className="step-one-element">
                                            <p>Title</p>
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
                                            <p>Description</p>
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
                                            <p>Job</p>
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
                                    See your resume as you build it
                                </p>
                                <div className="feature-image-section">
                                    <div className="step2"></div>
                                </div>
                                <p className="body">
                                    See your resume come to life as you make
                                    changes, ensuring that every modification
                                    reflects instantly. No more guesswork or
                                    surprises. With our live preview feature,
                                    you have full control and visibility of your
                                    resume's appearance, allowing you to craft
                                    the perfect document that truly represents
                                    your skills and achievements.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-feature-wrapper-last">
                    <div className="right-feature-container">
                        <div className="feature-right-last">
                            <div className="feature-text-section-last">
                                <p className="header">Don't overthink it</p>
                                <p className="body">
                                    Our powerful 'Enhance' feature analyzes your
                                    resume content and optimizes it to make it
                                    more professional and tailored to the job
                                    you're applying for. With just a click,
                                    watch as your skills, experience, and
                                    achievements are highlighted in a way that
                                    captures the attention of employers. Impress
                                    potential employers with a resume that
                                    stands out from the crowd and increases your
                                    chances of landing your dream job.
                                </p>
                                <p className="body">Try it out below!</p>
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
                                                        "Result-driven professional with a strong work ethic and a proven ability to thrive in a team-oriented environment. Committed to continuous learning and development, with a track record of quickly adapting to new processes, technologies, and systems."
                                                    );
                                                    setTimeout(function () {
                                                        setEnhanceText(
                                                            "Hard working person who works well in teams and learns fast."
                                                        );
                                                    }, 15000);
                                                }, 1000);
                                            }}
                                        >
                                            Enhance
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
            />
        </div>
    );
}

export default Home;
