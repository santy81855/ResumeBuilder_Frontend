import React, { useState, useEffect, useRef } from "react";
import "../styles/ResumePage.css";
import { useNavigate } from "react-router-dom";
import {
    templateToString,
    getTemplateComponent,
    templateNameToExport,
} from "../lib/TemplateKeys";
import ResumeSkeleton from "./skeletons/ResumeSkeleton";
import CreateResumeModal from "./CreateResumeModal";
import Modal from "react-modal";
import { savePDF } from "@progress/kendo-react-pdf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
    deleteResumeById,
    getAllUserResumes,
    getResumeById,
} from "../api/resume/ResumeRequests";

import { getUser } from "../api/user/UserRequests";

function ResumePage() {
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [resumeArr, setResumeArr] = useState([]);
    const [searchArr, setSearchArr] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [showCreateResumeTile, setShowCreateResumeTile] = useState(true);
    // variables needed for creating new resume
    const [resumeTitle, setResumeTitle] = useState("");
    const [resumeJob, setResumeJob] = useState("");
    const [resumeDescription, setResumeDescription] = useState("");
    const [resumeSearch, setResumeSearch] = useState("");
    const navigate = useNavigate();
    const resumeToPrintRef = useRef();

    // useEffect to fetch user data on load
    useEffect(() => {
        getUserQuery.refetch();
    }, []);

    // create a useEffect that is called whenever the 'resumeSearch' variable is changed
    useEffect(() => {
        // if the search bar is empty, then set the searchArr to the resumeArr
        if (resumeSearch === "") {
            setSearchArr(resumeArr);
        } else {
            // otherwise, filter the resumeArr to only include the resumes that match the search
            const filteredArr = resumeArr.filter((item) => {
                return item.key
                    .toLowerCase()
                    .includes(resumeSearch.toLowerCase());
            });
            setSearchArr(filteredArr);
        }
    }, [resumeSearch]);

    useEffect(() => {
        // whether to show or hide the create resume tile
        function handleResize() {
            const width = window.innerWidth;
            if (width <= 600) {
                setShowCreateResumeTile(false);
            } else {
                setShowCreateResumeTile(true);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        // code for checking if the user already has a Clean entry in their json and if not then adding it

        // loop through their templates array, and if "Clean" is not in the array then add it
        // if the name is not there we add it

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getResumeQuery = useQuery({
        queryKey: ["getResumeById"],
        queryFn: getResumeById,
        onSuccess: (data, variables, context) => {
            console.log(
                "Just fetched resume data in CreateResume component. Data: "
            );
            console.log(data);
        },
        onError: (error, variables, context) => {
            console.log(
                "Error Fetching resumes in CreateResume component. Error: "
            );
            console.log(error);
        },
        enabled: false,
    });

    const resumesQuery = useQuery({
        queryKey: ["getAllUserResumes"],
        queryFn: getAllUserResumes,
        onSuccess: (data, variables, context) => {
            // order the data items by date
            const sortedByDate = [];
            data.forEach((element) => {
                var temp = element;
                var tempDate = new Date(temp.lastFetched);
                temp.lastFetched = tempDate;
                sortedByDate.push(temp);
            });
            sortedByDate.sort((a, b) => {
                return b.lastFetched - a.lastFetched;
            });

            if (resumeArr.length === 0) {
                const tempArr = [];
                sortedByDate.forEach((element) => {
                    tempArr.push(makeResumeTile(element));
                });
                setResumeArr(tempArr);
                setSearchArr(tempArr);
            }
        },
        onError: (error, variables, context) => {
            console.log("Error Fetching resumes");
            console.log(error);
            toast.error(error, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
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

    const getUserQuery = useQuery({
        queryKey: ["getUserByToken"],
        queryFn: getUser,
        onSuccess: (data, variables, context) => {
            console.log(
                "Just fetched user data in CreateResume component. Data: "
            );
            console.log(data);
            setUserName(data.user.username);
            setFirstName(data.user.first);
            setLastName(data.user.last);
        },
        onError: (error, variables, context) => {
            console.log("Error Fetching User in ResumePage component. Error: ");
            console.log(error);
        },
        enabled: false,
    });

    // when they click on the create resume button
    const createResume = () => {
        setCreateModal(true);
    };

    const handleResumeUnhover = (event, id) => {
        // get the ResumePic element
        const div = event.currentTarget;
        // get the Template component
        const child = div.children;
        // show the template component
        child[0].style.display = "flex";
        // hide the options menu
        child[1].style.display = "none";
    };

    const handleResumeHover = (event, id) => {
        // get the ResumePic element
        //const div = event.currentTarget;
        const div = document.getElementById(id);
        console.log(div);
        // get the Template component
        const child = div.children;
        // hide the template component
        child[0].style.display = "none";
        // show the options menu
        child[1].style.display = "flex";
    };

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {}

    function closeModal() {
        setIsOpen(false);
    }

    function resumearrPrint() {
        return resumeArr[0].resumeTitle;
    }

    const doNothingFunction = () => {};

    const exportPDF = () => {
        const content = document.getElementById("template-to-print");
        savePDF(content, {
            paperSize: "Letter",
            margin: 0,
            fileName: "resume.pdf",
            landscape: false,
            pdf: {
                multiPage: false,
                font: "Arial",
            },
        });
    };

    const exportModal = (
        <div>
            <Modal
                className="export-modal"
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="export-modal"
                overlayClassName="export-overlay"
            >
                {getResumeQuery.isSuccess ? (
                    // determine the correct template
                    getTemplateComponent({
                        json: getResumeQuery.data.json,
                        isPreview: true,
                        handleSectionChange: doNothingFunction,
                        template: getResumeQuery.data.template,
                        isExport: false,
                    })
                ) : (
                    <div>getResumeQueryError</div>
                )}
                <div className="export-modal-buttons">
                    <button onClick={closeModal}>Close</button>
                    <button onClick={exportPDF}>Export Resume</button>
                </div>
            </Modal>
            <div className="hidden-template">
                {getResumeQuery.isSuccess ? (
                    // determine the correct template
                    getTemplateComponent({
                        json: getResumeQuery.data.json,
                        isPreview: true,
                        handleSectionChange: doNothingFunction,
                        template: getResumeQuery.data.template,
                        isExport: true,
                    })
                ) : (
                    <div>getResumeQueryError</div>
                )}
            </div>
        </div>
    );

    const handleEditClick = (event, id) => {
        console.log(event);
        console.log("edit-resume");
        // add the resumeid to the local storage
        localStorage.setItem("resumeId", id);
        // go to edit resume page
        navigate("/u/edit-resume");
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
        const div = event.currentTarget;
        console.log(typeof id);
        localStorage.setItem("resumeId", id);
        getResumeQuery.refetch();
        openModal();
    };

    function makeResumeTile(resumeData) {
        const {
            resumeTitle,
            _id,
            lastFetched,
            template,
            json,
            jobTitle,
            resumeDescription,
        } = resumeData;
        console.log(_id);
        const dateString = lastFetched;
        const date = new Date(dateString);
        const formattedDate = date.toLocaleString("en-US", {
            weekday: "long",
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
        const keyString = resumeTitle + jobTitle + resumeDescription;
        // determine the correct template
        const templateToShow = getTemplateComponent({
            json: json,
            isPreview: true,
            handleSectionChange: doNothingFunction,
            template: template,
        });

        return (
            <div className="ResumeTile" key={keyString}>
                <div
                    className="ResumePic"
                    id={_id}
                    onMouseLeave={(event) => handleResumeUnhover(event, _id)}
                >
                    {templateToShow}
                    <div className="ResumeOptionsMenu">
                        <button
                            className="EditResume"
                            onClick={(event) => handleEditClick(event, _id)}
                        >
                            Edit
                        </button>
                        <button
                            className="ExportResume"
                            onClick={(event) => handleExportClick(event, _id)}
                        >
                            Export
                        </button>
                        <button
                            className="DeleteResume"
                            onClick={(event) => handleDeleteClick(event, _id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
                <div className="ResumeDetails">
                    <h2>{resumeTitle}</h2>
                    <div className="DateButtonContainer">
                        <p>{formattedDate}</p>
                        <button
                            className="ResumeTileOptionsButton"
                            onClick={(event) => handleResumeHover(event, _id)}
                        ></button>
                    </div>
                </div>
            </div>
        );
    }
    const createResumeTile = (
        <div
            className="CreateResumeTile"
            id="CreateResumeTile"
            onClick={createResume}
        >
            <div className="EmptyResumePic">
                <div className="ResumePlusIcon"></div>
            </div>
        </div>
    );

    const skeletonResumeTile = (
        <div className="ResumeTile" onClick={createResume}>
            <div className="ResumePic">
                <ResumeSkeleton />
            </div>
        </div>
    );

    const headerSection = (
        <div className="HeaderSection">
            <div className="introContainer Section">
                <h1>
                    <span>Welcome back, </span>
                    {userName}!
                </h1>
                <p className="HeaderDescription">
                    Keep track of all your resumes and tailor them to specific
                    job applications. You'll be able to quickly and easily
                    access your resume history in one place.
                </p>
            </div>
        </div>
    );

    // if loading
    if (resumesQuery.isLoading && resumesQuery.fetchStatus !== "idle") {
        return (
            <div className="PageContainer">
                {headerSection}
                <div className="ResumeSection Section">
                    <div className="PageTitleContainer">
                        <div className="PageTitle">Resumes</div>
                        <div className="Button" onClick={createResume}>
                            <p>+</p>
                            <p>Create New</p>
                        </div>
                    </div>
                    <div className="ResumeTiles">
                        {createResumeTile}
                        {skeletonResumeTile}
                        {skeletonResumeTile}
                        {skeletonResumeTile}
                        {skeletonResumeTile}
                        {skeletonResumeTile}
                        {skeletonResumeTile}
                    </div>
                </div>
                {exportModal}
                <CreateResumeModal
                    createModal={createModal}
                    setCreateModal={setCreateModal}
                />
            </div>
        );
    }
    // if error
    else if (resumesQuery.status === "error") {
        toast.error(resumesQuery.error.message, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        return (
            <div>
                <ToastContainer />
            </div>
        );
    } else {
        return (
            <div className="PageContainer">
                {headerSection}
                <div className="diffusion"></div>
                <div className="ResumeSection Section">
                    <div className="PageTitleContainer">
                        <div className="PageTitle">Resumes</div>
                        <div className="Button" onClick={createResume}>
                            <p>+</p>
                            <p>Create New</p>
                        </div>
                    </div>
                    <div className="SearchBarContainer">
                        <h4>Search:</h4>
                        <input
                            className="SearchBar"
                            type="text"
                            placeholder="search by name, job, or description"
                            value={resumeSearch}
                            onChange={(event) => {
                                setResumeSearch(event.currentTarget.value);
                            }}
                        ></input>
                    </div>
                    <div className="ResumeTiles">
                        {showCreateResumeTile && createResumeTile}
                        {searchArr}
                    </div>
                </div>
                {exportModal}
                <ToastContainer />
                <CreateResumeModal
                    createModal={createModal}
                    setCreateModal={setCreateModal}
                />
            </div>
        );
    }
}

export default ResumePage;
