import React, { useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom"; // go to another page when you click "Create-Resume button on homepage"
import { TypeAnimation } from "react-type-animation";
import CreateResumeModal from "./CreateResumeModal";
import Modal from "react-modal";

import resume1 from "../images/home/resume-pic-1.png";
import resume2 from "../images/home/resume-pic-2.png";

import step1 from "../images/home/step1.png";

import JSONResumeData from "../resume-schema.json";
import CleanTemplate from "./templates/CleanTemplate";
import ModernTemplate from "./templates/ModernTemplate";

function Home() {
    const [createModal, setCreateModal] = useState(false);
    const navigate = useNavigate();
    const createResume2 = async (resumeData) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                "http://myhost.com:3000/resume/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(resumeData),
                }
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    // when they press create resume button they will be either redirected to the login page or to the first question
    const CreateResume = () => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("resumeId");
            navigate("/u/create-resume");
        } else {
            navigate("/login");
        }
    };
    const doNothingFunction = () => {};

    const createResumeHomeClick = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setCreateModal(true);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="landing-page">
            <div className="landing-page-background">
                <div className="content-container">
                    <p>
                        <span>Artificial Intelligence Resume Builder</span>
                    </p>
                    <h1>
                        Create your perfect resume in <span>minutes</span> with
                        the help of <span>AI.</span>
                    </h1>
                    <p>
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
                    <div className="feature-left">
                        <div className="feature-text-section">
                            <p className="header">Tailor each resume</p>
                            <p className="body">
                                Our user-friendly interface allows you to
                                effortlessly craft unique resumes that perfectly
                                match the requirements of each opportunity. It's
                                as simple as filling in the essential details -
                                title, description, and job - to create a
                                standout resume that showcases your skills and
                                experience
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

                <div className="right-feature-wrapper">
                    <div className="feature-right">
                        <div className="feature-image-section">
                            Create Resume Picture Here (Full Resume) then zoom
                            into the summary with a pointer cursor on the
                            enhance and generate button. On the second picture
                            it will be an animation of clicking the enhance
                            button and then the resume will be enhanced.
                        </div>
                        <div className="feature-text-section">
                            <p className="header"></p>
                            <p className="body">
                                Leverage the power of artificial intelligence to
                                streamline the resume creation process. Whether
                                you need a resume from scratch or want to
                                enhance your existing one, our intelligent AI
                                algorithms analyze and optimize each section
                                with precision.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <CreateResumeModal
                createModal={createModal}
                setCreateModal={setCreateModal}
            />
        </div>
    );
}

export default Home;
