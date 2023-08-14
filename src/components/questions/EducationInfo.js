import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EducationInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [institution, setInstitution] = useState("");
    const [degree, setDegree] = useState("");
    const [degreeArea, setDegreeArea] = useState("");
    const [gpa, setGpa] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [summary, setSummary] = useState("");

    const [experienceList, setExperienceList] = useState(resumeData.education);

    const institutionRef = useRef();
    const degreeRef = useRef();
    const degreeAreaRef = useRef();
    const gpaRef = useRef();
    const startRef = useRef();
    const endRef = useRef();

    const [numHighlights, setNumHighlights] = useState(1);

    const [highlight1, setHighlight1] = useState("");
    const [highlight2, setHighlight2] = useState("");
    const [highlight3, setHighlight3] = useState("");
    const [highlight4, setHighlight4] = useState("");
    const [highlight5, setHighlight5] = useState("");
    const [highlight6, setHighlight6] = useState("");
    const [highlight7, setHighlight7] = useState("");

    const highlightArray = [
        highlight1,
        highlight2,
        highlight3,
        highlight4,
        highlight5,
        highlight6,
        highlight7,
    ];
    const setHighlightArray = [
        setHighlight1,
        setHighlight2,
        setHighlight3,
        setHighlight4,
        setHighlight5,
        setHighlight6,
        setHighlight7,
    ];

    const addSchool = () => {
        // get all necessary variables
        // institution
        var ins = institutionRef.current.value;
        // degree type
        var deg = degreeRef.current.value;
        // degree area
        var ar = degreeAreaRef.current.value;
        // gpa
        var gp = gpaRef.current.value;
        // start date
        var st = start;
        // end date
        var en = end;
        // school highlights
        var hl = [];
        for (var i = 0; i < numHighlights; i++) {
            if (highlightArray[i] !== "") {
                hl.push(highlightArray[i]);
            }
        }
        // ensure all the necessary values are filled
        if (ins === "" || deg === "" || st === "" || en === "") {
            toast.info("Please fill out all of the fields.", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        // make an object of the vars
        var school = {
            institution: ins,
            studyType: deg,
            area: ar,
            startDate: st,
            endDate: en,
            gpa: gp,
            courses: hl,
        };
        // get the current list of job history
        var tempEducation = resumeData.education;
        tempEducation.push(school);
        setResumeData({
            ...resumeData,
            education: tempEducation,
        });
        // make the input fields blank again
        setInstitution("");
        setDegree("");
        setDegreeArea("");
        setStart("");
        setEnd("");
        setGpa("");
        setHighlight1("");
        setHighlight2("");
        setHighlight3("");
        setHighlight4("");
        setHighlight5("");
        setHighlight6("");
        setHighlight7("");
    };

    const removeJob = (event) => {
        // update the skillList
        var tempArr = experienceList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
        // update the resumeData
        setResumeData({
            ...resumeData,
            education: tempArr,
        });
        setExperienceList(tempArr);
    };

    const addHighlightInput = () => {
        // add it to the highlights arr
        if (numHighlights < 7) setNumHighlights(numHighlights + 1);
    };

    const removeHighlightInput = () => {
        // add it to the highlights arr
        if (numHighlights > 0) setNumHighlights(numHighlights - 1);
    };

    const editJob = (event, school) => {
        setInstitution(school.institution);
        setDegree(school.studyType);
        setDegreeArea(school.area);
        setStart(school.startDate);
        setEnd(school.endDate);
        setGpa(school.gpa);
        setNumHighlights(school.courses.length);
        school.courses.forEach((highlight, index) => {
            setHighlightArray[index](highlight);
        });

        // remove the job from the work array
        removeJob(event);
        // scroll up to the top of the modal
        const header = document.getElementById("header");
        header.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="question-container">
            <div id="header" className="header">
                <h2>Education</h2>
                <p>Enter your education history in this section.</p>
            </div>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>Institution</p>
                    <input
                        id="institution"
                        ref={institutionRef}
                        placeholder="e.g. Oregon State University"
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setInstitution(event.target.value);
                        }}
                        value={institution}
                    ></input>
                </div>
                <div className="input-item">
                    <p>Degree Type</p>
                    <input
                        id="degree"
                        ref={degreeRef}
                        placeholder="e.g. Bachelor's Degree"
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setDegree(event.target.value);
                        }}
                        value={degree}
                    ></input>
                </div>
                <div className="input-item">
                    <p>Degree Area</p>
                    <input
                        id="area"
                        ref={degreeAreaRef}
                        placeholder="e.g. Computer Science"
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setDegreeArea(event.target.value);
                        }}
                        value={degreeArea}
                    ></input>
                </div>
                <div className="input-item">
                    <p>GPA (optional)</p>
                    <input
                        id="gpa"
                        ref={gpaRef}
                        placeholder="e.g. 3.5"
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setGpa(event.target.value);
                        }}
                        value={gpa}
                    ></input>
                </div>
                <div className="input-item">
                    <p>Start Date</p>
                    <DatePicker
                        className="short-input"
                        ref={startRef}
                        selected={start}
                        onChange={(date) => setStart(date)}
                    />
                </div>
                <div className="input-item">
                    <p>End Date</p>
                    <DatePicker
                        className="short-input"
                        ref={endRef}
                        selected={end}
                        onChange={(date) => setEnd(date)}
                    />
                </div>
            </div>
            <div className="job-summary-container">
                <div className="add-highlight-container">
                    <p>Highlights</p>
                    <button
                        className="minus-button"
                        onClick={removeHighlightInput}
                    >
                        -
                    </button>
                    <p>{numHighlights}</p>
                    <button className="plus-button" onClick={addHighlightInput}>
                        +
                    </button>
                </div>
                <p>
                    You can change the number of highlights by adding or
                    removing them with the buttons above. If you don't wish to
                    add any highlights, leave the fields blank.
                </p>
                {numHighlights >= 1 && (
                    <textarea
                        id={0}
                        className="job-summary"
                        placeholder="e.g. Received Dean's List award 5 times."
                        type="text"
                        onChange={(event) => {
                            setHighlight1(event.target.value);
                        }}
                        value={highlight1}
                        rows="3"
                    />
                )}
                {numHighlights >= 2 && (
                    <textarea
                        id={1}
                        className="job-summary"
                        placeholder="e.g. Received Dean's List award 5 times."
                        type="text"
                        onChange={(event) => {
                            setHighlight2(event.target.value);
                        }}
                        value={highlight2}
                        rows="3"
                    />
                )}
                {numHighlights >= 3 && (
                    <textarea
                        id={2}
                        className="job-summary"
                        placeholder="e.g. Received Dean's List award 5 times."
                        type="text"
                        onChange={(event) => {
                            setHighlight3(event.target.value);
                        }}
                        value={highlight3}
                        rows="3"
                    />
                )}
                {numHighlights >= 4 && (
                    <textarea
                        id={3}
                        className="job-summary"
                        placeholder="e.g. Received Dean's List award 5 times."
                        type="text"
                        onChange={(event) => {
                            setHighlight4(event.target.value);
                        }}
                        value={highlight4}
                        rows="3"
                    />
                )}
                {numHighlights >= 5 && (
                    <textarea
                        id={4}
                        className="job-summary"
                        placeholder="e.g. Received Dean's List award 5 times."
                        type="text"
                        onChange={(event) => {
                            setHighlight5(event.target.value);
                        }}
                        value={highlight5}
                        rows="3"
                    />
                )}
                {numHighlights >= 6 && (
                    <textarea
                        id={5}
                        className="job-summary"
                        placeholder="e.g. Received Dean's List award 5 times."
                        type="text"
                        onChange={(event) => {
                            setHighlight6(event.target.value);
                        }}
                        value={highlight6}
                        rows="3"
                    />
                )}
                {numHighlights >= 7 && (
                    <textarea
                        id={6}
                        className="job-summary"
                        placeholder="e.g. Received Dean's List award 5 times."
                        type="text"
                        onChange={(event) => {
                            setHighlight7(event.target.value);
                        }}
                        value={highlight7}
                        rows="3"
                    />
                )}
            </div>
            <div className="experience-button-container">
                <button className="experience-button" onClick={addSchool}>
                    Add School
                </button>
            </div>
            <div className="experience-history-container">
                {experienceList.map((school, index) => {
                    const formattedDateStart = school.startDate?.toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    );

                    const formattedDateEnd = school.endDate?.toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    );
                    return (
                        <div key={index} className="experience-item">
                            <button
                                className="delete-experience-item-button"
                                id={index}
                                key={index}
                                onClick={removeJob}
                            >
                                Delete
                            </button>
                            <button
                                className="edit-experience-item-button"
                                key={index}
                                id={index}
                                onClick={(event) => {
                                    editJob(event, school);
                                }}
                            >
                                Edit
                            </button>
                            <h3>
                                {school.area} {school.studyType},{" "}
                                {school.institution}
                            </h3>
                            <h4>
                                {formattedDateStart} - {formattedDateEnd}
                            </h4>
                            {school.gpa && <p>GPA: {school.gpa}</p>}
                            {school.courses.length > 0 && <h4>Highlights:</h4>}
                            <ul>
                                {school.courses.map((highlight, index) => (
                                    <li key={index}>{highlight}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>

            <div className="question-container-button-container">
                <button
                    className="question-container-close-button"
                    onClick={closeModal}
                >
                    Back
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : "apply"}
                </button>
            </div>
        </div>
    );
};

export default EducationInfo;
