import React, { useState, useEffect } from "react";
import "../styles/ResumePage.css";
import { useNavigate } from "react-router-dom"; // go to another page when you click "Create-Resume button on homepage"

function ResumePage() {
    const [resumeArr, setResumeArr] = useState([]);

    const createResume = () => {
        console.log("create-resume");
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://myhost.com:3000/resume/user/all", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                // the response is an array of resumes
                .then((data) => {
                    if (resumeArr.length == 0) {
                        const tempArr = [];
                        data.forEach((element) => {
                            tempArr.push(makeResumeTile(element));
                        });
                        setResumeArr(tempArr);
                    }
                })
                .catch((error) => {
                    console.error(
                        "There was a problem with the fetch operation:",
                        error
                    );
                });
        }
    }, []);

    function makeResumeTile(resumeData) {
        const { resumeTitle } = resumeData;
        return (
            <div className="ResumeTile">
                <div className="ResumePic"></div>
                <div className="ResumeDetails">
                    <h2>{resumeTitle}</h2>
                    <p>date</p>
                    <p>Description of Resume 1ostnahutoaheutnsoehaustnhoea</p>
                </div>
            </div>
        );
    }
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
                    {resumeArr}
                    {createResumeTile}
                </div>
                <div className="CoverLetter">he</div>
            </div>
        </div>
    );
}

export default ResumePage;
