import React, { useState, useEffect, useRef } from "react";
import "../styles/ResumePage.css";
import { useNavigate } from "react-router-dom";
import CleanTemplate from "./templates/CleanTemplate";
import JSONResumeData from "../resume-schema.json";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
    deleteResumeById,
    getAllUserResumes,
} from "../api/resume/ResumeRequests";

function ResumePage() {
    const [resumeArr, setResumeArr] = useState([]);
    const navigate = useNavigate();

    //********************************************//
    const resumesQuery = useQuery({
        queryKey: ["getAllUserResumes"],
        queryFn: getAllUserResumes,
        onSuccess: (data, variables, context) => {
            if (resumeArr.length === 0) {
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

    const deleteResumeMutation = useMutation({
        mutationFn: deleteResumeById,
        onSuccess: (data, variables, context) => {
            console.log("Resume Deleted Successfully");
            // remove the resume from the resume arr in order to remove it from the screen
            const id = variables.id;
            const updatedResumeArr = resumeArr.filter(
                (item) => item.key !== id
            );
            setResumeArr(updatedResumeArr);
        },
        onError: (error, variables, context) => {
            console.log("Problem Deleting Resume");
            console.log(error);
        },
        onMutate: (variables) => {
            return { hello: "goodbye" };
        },
    });

    //********************************************//
    /*
       localStorage.setItem("token", token);
    },

    logout() {
        this.isLoggedIn = false;
        this.user = null;
        localStorage.removeItem("token");
    */
    const createResume = () => {
        console.log("create-resume");
        // clear the current resume being stored in local storage
        localStorage.removeItem("resumeId");
        // ensure that there is no "current resume" stored in local storage so that this resume can be stored as a new resume
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
    const handleResumeUnhover = (event, id) => {
        // get the ResumePic element
        const div = event.currentTarget;
        // get the Template component
        const child = div.children;
        // show the template component
        child[0].style.display = "flex";
        child[1].style.transition = "";
        // hide the options menu
        child[1].style.display = "none";
    };

    const handleResumeHover = (event, id) => {
        // get the ResumePic element
        const div = event.currentTarget;
        // get the Template component
        const child = div.children;
        // hide the template component
        child[0].style.display = "none";
        // show the options menu
        child[1].style.display = "flex";
    };

    const handleEditClick = (event, id) => {
        console.log(event);
        const div = event.currentTarget;
    };

    const handleDeleteClick = (event, id) => {
        console.log(event);
        const div = event.currentTarget;

        console.log("we need to delete a resume");
        deleteResumeMutation.mutate({
            id: id,
        });
    };

    const handleExportClick = (event, id) => {
        console.log(event);
        const div = event.currentTarget;
    };

    const doNothingFunction = () => {};

    function makeResumeTile(resumeData) {
        const { resumeTitle, _id, lastFetched, json } = resumeData;
        const options = { weekday: "long", year: "numeric", month: "long" };
        console.log(_id);
        return (
            <div className="ResumeTile" key={_id}>
                <div className="ResumeDetails">
                    <h2>{resumeTitle}</h2>
                    <div className="DateButtonContainer">
                        <p>{lastFetched.toString()}</p>
                        <button className="ResumeTileOptionsButton"></button>
                    </div>
                </div>
                <div
                    className="ResumePic"
                    onMouseEnter={(event) => handleResumeHover(event, _id)}
                    onMouseLeave={(event) => handleResumeUnhover(event, _id)}
                >
                    <CleanTemplate
                        resumeData={json}
                        isPreview={true}
                        handleSectionChange={doNothingFunction}
                    />
                    <div className="ResumeOptionsMenu">
                        <button
                            className="EditResume"
                            onClick={(event) => handleEditClick(event, _id)}
                        >
                            Edit
                        </button>
                        <button
                            className="DeleteResume"
                            onClick={(event) => handleDeleteClick(event, _id)}
                        >
                            Delete
                        </button>
                        <button
                            className="ExportResume"
                            onClick={(event) => handleExportClick(event, _id)}
                        >
                            Export
                        </button>
                    </div>
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
