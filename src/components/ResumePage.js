import React, { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import { getTemplateComponent } from "../lib/TemplateKeys";
import {
    deleteResumeById,
    getAllUserResumes,
    getResumeById,
} from "../api/resume/ResumeRequests";
import { getUser } from "../api/user/UserRequests";
import { exportToPDF } from "../lib/ExportToPDF";
import "react-toastify/dist/ReactToastify.css";
import CreateResumeModal from "./CreateResumeModal";
import ResumeSkeleton from "./skeletons/ResumeSkeleton";
import ResumeTile from "./ResumeTile";
import CreateResumeTile from "./CreateResumeTile";
import "../styles/ResumePage.css";

function ResumePage() {
    const [userName, setUserName] = useState("");
    const [resumeArr, setResumeArr] = useState([]);
    const [searchArr, setSearchArr] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const [showCreateResumeTile, setShowCreateResumeTile] = useState(true);
    const [resumeSearch, setResumeSearch] = useState("");

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
                return item.props.keyString
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
        setCreateModal(true);
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
                    {getResumeQuery.isSuccess ? (
                        // determine the correct template
                        getTemplateComponent({
                            json: getResumeQuery.data.json,
                            isPreview: true,
                            handleSectionChange: () => {},
                            template: getResumeQuery.data.template,
                            isExport: false,
                        })
                    ) : (
                        <div>getResumeQueryError</div>
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
                                    fileName: getResumeQuery.data.resumeTitle,
                                });
                            }}
                        >
                            Export Resume
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="hidden-template">
                {getResumeQuery.isSuccess ? (
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
            <div className="PageContainer">
                {headerSection}
                <div className="diffusion"></div>
                <div className="ResumeSectionContainer">
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
                            {showCreateResumeTile && (
                                <CreateResumeTile createResume={createResume} />
                            )}
                            {searchArr}
                        </div>
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
