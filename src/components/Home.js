import React, { useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom"; // go to another page when you click "Create-Resume button on homepage"
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
                            setCreateModal(true);
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
                            <p className="header">Make a lasting impression</p>
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
                                        <input
                                            id="sample-title"
                                            type="text"
                                            readOnly
                                        ></input>
                                    </div>
                                    <div className="step-one-element">
                                        <p>Description</p>
                                        <input
                                            id="sample-description"
                                            type="text"
                                            readOnly
                                        ></input>
                                    </div>
                                    <div className="step-one-element">
                                        <p>Job</p>
                                        <input
                                            id="sample-job"
                                            type="text"
                                            readOnly
                                        ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-feature-wrapper">
                    <div className="feature-right">
                        <div className="feature-image-section">
                            Picture Here
                        </div>
                        <div className="feature-text-section">
                            <p className="header">
                                Can't find the right words?
                            </p>
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
