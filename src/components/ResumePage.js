import React, { useState, useEffect } from "react";
import "../styles/ResumePage.css";
import { useNavigate } from "react-router-dom";
import CleanTemplate from "./templates/CleanTemplate";
import JSONResumeData from "../resume-schema.json";

import { useQuery, useMutation } from "@tanstack/react-query";
import { createResume, getAllUserResumes } from "../api/resume/ResumeRequests";

function ResumePage() {
    const [resumeArr, setResumeArr] = useState([]);
    const navigate = useNavigate();

    //********************************************//
    const resumesQuery = useQuery({
        queryKey: ["getAllUserResumes"],
        queryFn: getAllUserResumes,
        onSuccess: (data, variables, context) => {
            if (resumeArr.length == 0) {
                const tempArr = [];
                data.reverse().forEach((element) => {
                    tempArr.push(makeResumeTile(element));
                });
                setResumeArr(tempArr);
            }
        },
        onError: (error, variables, context) => {
            console.log("Error Fetching resumes");
            console.log(error);
        },
    });
    //********************************************//

    const createResume = () => {
        console.log("create-resume");
        navigate("/u/create-resume");
    };
    /*
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
                        data.reverse().forEach((element) => {
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
*/
    const handleResumeClick = (resumeId) => {
        console.log("clicked resume " + resumeId);
    };

    function makeResumeTile(resumeData) {
        const { resumeTitle, _id, lastFetched, json } = resumeData;
        const options = { weekday: "long", year: "numeric", month: "long" };

        return (
            <div className="ResumeTile" onClick={() => handleResumeClick(_id)}>
                <div className="ResumeDetails">
                    <h2>{resumeTitle}</h2>
                    <p>{lastFetched.toString()}</p>
                </div>
                <div className="ResumePic">
                    <CleanTemplate
                        resumeData={JSONResumeData}
                        isPreview={true}
                    />
                </div>
            </div>
        );
    }
    const createResumeTile = (
        <div className="CreateResumeTile" onClick={createResume}>
            <div className="ResumeDetails">
                <h2>Untitled</h2>
                <p>Create a new resume.</p>
            </div>
            <div className="EmptyResumePic">
                <div className="ResumePlusIcon"></div>
            </div>
        </div>
    );

    return (
        <div className="PageContainer">
            <div className="BackgroundImageResume">
                <div className="introContainer">
                    <h2>Welcome to your personal Resume Page!</h2>
                    <h4>
                        Organize your job search with our Resume Page feature!
                        Keep track of all your resumes and tailor them to
                        specific job applications. You'll be able to quickly and
                        easily access your resume history in one place.
                    </h4>
                </div>
            </div>

            <div className="PageTitleContainer">
                <div className="PageTitle">Resumes</div>
                <div className="CreateResumeButton" onClick={createResume}>
                    <p>+</p>
                    <p>Create New</p>
                </div>
            </div>
            <div className="ResumeTiles">
                {createResumeTile}
                <div className="VerticalLine"></div>
                {resumeArr}
            </div>
            <div className="CoverLetter"></div>
        </div>
    );
}

export default ResumePage;
