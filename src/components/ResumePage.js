import React from "react";
import "../styles/ResumePage.css";
import { useNavigate } from "react-router-dom"; // go to another page when you click "Create-Resume button on homepage"

function ResumePage() {
    const createResume = () => {
        console.log("create-resume");
    };

    const resumeTile = (
        <div className="ResumeTile">
            <div className="ResumePic"></div>
            <div className="ResumeDetails">
                <h2>Resume 1 title</h2>
                <p>date</p>
                <p>Description of Resume 1ostnahutoaheutnsoehaustnhoea</p>
            </div>
        </div>
    );
    const createResumeTile = (
        <div className="CreateResumeTile" onClick={createResume}>
            <div className="EmptyResumePic">
                <div className="ResumePlusIcon"></div>
            </div>
            <div className="ResumeDetails">
                <h2>New Resume</h2>
                <p>
                    Create a new resume that fits the job you are applying for.
                </p>
            </div>
        </div>
    );

    return (
        <div className="BackgroundImageResume">
            <div className="PageContainer">
                <div className="PageTitleContainer">
                    <div className="PageTitle">Resumes</div>
                    <div className="CreateResumeButton" onClick={createResume}>
                        <p>+</p>
                        <p>Create New</p>
                    </div>
                </div>
                <div className="ResumeTiles">
                    {resumeTile}
                    {resumeTile}
                    {createResumeTile}
                </div>
                <div className="CoverLetter">he</div>
            </div>
        </div>
    );
}

export default ResumePage;
