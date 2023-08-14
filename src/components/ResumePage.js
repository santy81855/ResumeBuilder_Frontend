import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { getTemplateComponent } from "../lib/TemplateKeys";
import { getTemplateComponent as getLetterTemplateComponent } from "../lib/LetterTemplateKeys";
import {
    deleteResumeById,
    getAllUserResumes,
    getResumeById,
} from "../api/resume/ResumeRequests";
import {
    deleteLetterById,
    getAllUserLetters,
    getLetterById,
} from "../api/letter/LetterRequests";
import { getUser } from "../api/user/UserRequests";
import { exportToPDF } from "../lib/ExportToPDF";
import "react-toastify/dist/ReactToastify.css";
import CreateResumeModal from "./CreateResumeModal";
import CreateLetterModal from "./CreateLetterModal";
import ResumeSkeleton from "./skeletons/ResumeSkeleton";
import ResumeTile from "./ResumeTile";
import LetterTile from "./LetterTile";
import CreateResumeTile from "./CreateResumeTile";
import "../styles/ResumePage.css";
import Footer from "./Footer";

import { getSubscription } from "../api/subscription/SubscriptionRequests";
import SubscriptionModal from "./SubscriptionModal";
import { createCheckoutSession } from "../api/stripe/StripeRequests";

function ResumePage() {
    const [userName, setUserName] = useState("");
    const [resumeArr, setResumeArr] = useState([]);
    const [searchArr, setSearchArr] = useState([]);
    const [letterArr, setLetterArr] = useState([]);
    const [letterSearchArr, setLetterSearchArr] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [createLetterModal, setCreateLetterModal] = useState(false);
    const [showCreateResumeTile, setShowCreateResumeTile] = useState(true);
    const [resumeSearch, setResumeSearch] = useState("");
    const [display, setDisplay] = useState("resumes"); // resume or coverLetter

    const [resumes, setResumes] = useState([]);
    const [letters, setLetters] = useState([]);

    const [subscriptionModal, setSubscriptionModal] = useState(false);

    // useEffect to fetch user data on load
    useEffect(() => {
        getUserQuery.refetch();
    }, []);

    // create a useEffect that is called whenever the 'resumeSearch' variable is changed
    useEffect(() => {
        // if the search bar is empty, then set the searchArr to the resumeArr
        if (display === "resumes") {
            if (resumeSearch === "") {
                setSearchArr(resumeArr);
            } else {
                // otherwise, filter the resumeArr to only include the resumes that match the search
                const filteredArr = resumeArr.filter((item) => {
                    return item.props.keyString
                        .toLowerCase()
                        .includes(resumeSearch.toLowerCase());
                });
                setSearchArr(filteredArr);
            }
        } else {
            if (resumeSearch === "") {
                setLetterSearchArr(letterArr);
            } else {
                // otherwise, filter the resumeArr to only include the resumes that match the search
                const filteredArr = letterArr.filter((item) => {
                    return item.props.keyString
                        .toLowerCase()
                        .includes(resumeSearch.toLowerCase());
                });
                setLetterSearchArr(filteredArr);
            }
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

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const getResumeQuery = useQuery({
        queryKey: ["getResumeById"],
        queryFn: getResumeById,
        onSuccess: (data, variables, context) => {},
        onError: (error, variables, context) => {
            console.log(error);
        },
        enabled: false,
    });

    const getLetterQuery = useQuery({
        queryKey: ["getLetterById"],
        queryFn: getLetterById,
        onSuccess: (data, variables, context) => {},
        onError: (error, variables, context) => {
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
                sortedByDate.forEach((element, index) => {
                    tempArr.push(
                        <ResumeTile
                            key={index}
                            resumeData={element}
                            getResumeQuery={getResumeQuery}
                            deleteResumeMutation={deleteResumeMutation}
                            openModal={openModal}
                            getTemplateComponent={getTemplateComponent}
                            keyString={
                                element.resumeTitle +
                                element.jobTitle +
                                element.resumeDescription
                            }
                        />
                    );
                });
                setResumeArr(tempArr);
                setSearchArr(tempArr);
                setResumes(data);
            }
        },
        onError: (error, variables, context) => {
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

    const lettersQuery = useQuery({
        queryKey: ["getAllUserLetters"],
        queryFn: getAllUserLetters,
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

            if (letterArr.length === 0) {
                const tempArr = [];
                sortedByDate.forEach((element, index) => {
                    tempArr.push(
                        <LetterTile
                            key={index}
                            letterData={element}
                            getLetterQuery={getLetterQuery}
                            deleteLetterMutation={deleteLetterMutation}
                            openModal={openModal}
                            getTemplateComponent={getLetterTemplateComponent}
                            keyString={
                                element.letterTitle +
                                element.jobTitle +
                                element.letterDescription
                            }
                        />
                    );
                });
                setLetterArr(tempArr);
                setLetterSearchArr(tempArr);
                setLetters(data);
            }
        },
        onError: (error, variables, context) => {
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
            // remove the resume from the resume arr in order to remove it from the screen
            const id = variables.id;
            const updatedResumeArr = resumeArr.filter(
                (item) => item.props.resumeData._id !== id
            );
            setSearchArr(updatedResumeArr);
            setResumeArr(updatedResumeArr);
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
        onMutate: (variables) => {
            return { hello: "goodbye" };
        },
    });

    const deleteLetterMutation = useMutation({
        mutationFn: deleteLetterById,
        onSuccess: (data, variables, context) => {
            // remove the resume from the resume arr in order to remove it from the screen
            const id = variables.id;
            const updatedLetterArr = letterArr.filter(
                (item) => item.props.letterData._id !== id
            );
            setLetterSearchArr(updatedLetterArr);
            setLetterArr(updatedLetterArr);
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
        onMutate: (variables) => {
            return { hello: "goodbye" };
        },
    });

    const subscriptionQuery = useQuery({
        queryKey: ["getSubscription"],
        queryFn: getSubscription,
        onSuccess: (data, variables, context) => {},
        onError: (error, variables, context) => {},
    });

    const getUserQuery = useQuery({
        queryKey: ["getUserByToken"],
        queryFn: getUser,
        onSuccess: (data, variables, context) => {
            setUserName(data.user.username);
        },
        onError: (error, variables, context) => {
            console.log(error);
        },
        enabled: false,
    });

    // when they click on the create resume button
    const createResume = () => {
        console.log("here");
        const token = localStorage.getItem("token");
        if (token) {
            // if the user has a subscription
            if (subscriptionQuery.data?.length === 1) {
                if (display === "resumes") {
                    setCreateModal(true);
                } else {
                    setCreateLetterModal(true);
                }
            }

            // if the user has no subscription
            else {
                // if they haven't created their free resume yet
                // if they are trying to create a resume
                if (display === "resumes") {
                    if (resumesQuery.data?.length === 0) {
                        setCreateModal(true);
                    } else if (resumesQuery.data?.length > 0) {
                        // they have already created a free resume show the subscription dialogue
                        setSubscriptionModal(true);
                    }
                } else {
                    if (lettersQuery.data?.length === 0) {
                        setCreateLetterModal(true);
                    } else if (lettersQuery.data?.length > 0) {
                        setSubscriptionModal(true);
                    }
                }
            }
        }
    };

    function openModal() {
        setIsOpen(true);
    }
    function afterOpenModal() {}

    function closeModal() {
        setIsOpen(false);
    }

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
                <div className="export-container">
                    {display === "resumes" && getResumeQuery.isSuccess ? (
                        // determine the correct template
                        getTemplateComponent({
                            json: getResumeQuery.data.json,
                            isPreview: true,
                            handleSectionChange: () => {},
                            template: getResumeQuery.data.template,
                            isExport: false,
                        })
                    ) : (
                        <div>Could not find resume</div>
                    )}
                    {display === "coverLetters" && getLetterQuery.isSuccess ? (
                        // determine the correct template
                        getLetterTemplateComponent({
                            json: getLetterQuery.data.json,
                            isPreview: true,
                            handleSectionChange: () => {},
                            template: getLetterQuery.data.template,
                            isExport: false,
                        })
                    ) : (
                        <div>Could not find letter</div>
                    )}

                    <div className="export-modal-buttons">
                        <button onClick={closeModal}>Close</button>
                        <button
                            onClick={() => {
                                exportToPDF({
                                    content:
                                        document.getElementById(
                                            "template-to-print"
                                        ),
                                    fileName:
                                        display === "resumes"
                                            ? getResumeQuery.data.resumeTitle
                                            : getLetterQuery.data.letterTitle,
                                });
                            }}
                        >
                            Export Resume
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="hidden-template">
                {display === "resumes" && getResumeQuery.isSuccess ? (
                    // determine the correct template
                    getTemplateComponent({
                        json: getResumeQuery.data.json,
                        isPreview: false,
                        handleSectionChange: () => {},
                        template: getResumeQuery.data.template,
                        isExport: true,
                    })
                ) : (
                    <div>getResumeQueryError</div>
                )}
                {display === "coverLetters" && getLetterQuery.isSuccess ? (
                    // determine the correct template
                    getLetterTemplateComponent({
                        json: getLetterQuery.data.json,
                        isPreview: false,
                        handleSectionChange: () => {},
                        template: getLetterQuery.data.template,
                        isExport: true,
                    })
                ) : (
                    <div>getLetterQueryError</div>
                )}
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

    const resumeButtons = <div className="DisplayOptionsContainer"></div>;

    const displayButtonClicked = (e) => {
        if (display === "resumes") {
            setDisplay("coverLetters");
            const resumeButton = document.getElementById("resumeButton");
            const coverLetterButton =
                document.getElementById("coverLetterButton");
            resumeButton.style.border = "none";
            coverLetterButton.style.border = "2px solid var(--accent-color-2)";
        } else {
            setDisplay("resumes");
            const resumeButton = document.getElementById("resumeButton");
            const coverLetterButton =
                document.getElementById("coverLetterButton");
            resumeButton.style.border = "2px solid var(--accent-color-2)";
            coverLetterButton.style.border = "none";
        }
    };

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
                        <CreateResumeTile createResume={createResume} />
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
            <main className="PageContainer">
                {headerSection}
                <div className="diffusion"></div>
                <section className="ResumeSectionContainer">
                    <div className=" displayOptionsContainer">
                        {" "}
                        <button
                            id="resumeButton"
                            className="resumeButton"
                            onClick={(event) => {
                                displayButtonClicked(event);
                            }}
                            style={{
                                border: "2px solid var(--accent-color-2)",
                            }}
                        >
                            Resumes
                        </button>
                        <button
                            id="coverLetterButton"
                            className="resumeButton"
                            onClick={(event) => {
                                displayButtonClicked(event);
                            }}
                        >
                            Cover Letters
                        </button>
                    </div>
                    <div className="ResumeSection Section">
                        <div className="PageTitleContainer">
                            <h1 className="PageTitle">
                                {display === "resumes"
                                    ? "Resumes"
                                    : "Cover Letters"}
                            </h1>
                            <button className="Button" onClick={createResume}>
                                <p>+</p>
                                <p>Create New</p>
                            </button>
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
                            {showCreateResumeTile && (
                                <CreateResumeTile createResume={createResume} />
                            )}
                            {display === "resumes"
                                ? searchArr
                                : letterSearchArr}
                        </div>
                    </div>
                </section>
                {exportModal}
                <ToastContainer />
                <CreateResumeModal
                    createModal={createModal}
                    setCreateModal={setCreateModal}
                />
                <CreateLetterModal
                    createModal={createLetterModal}
                    setCreateModal={setCreateLetterModal}
                />
                <SubscriptionModal
                    subscriptionModal={subscriptionModal}
                    setSubscriptionModal={setSubscriptionModal}
                    user={getUserQuery.data?.user}
                    createCheckoutSession={createCheckoutSession}
                    setCreateModal={setCreateModal}
                    resumes={resumes}
                    letters={letters}
                />
                <Footer />
            </main>
        );
    }
}

export default ResumePage;
