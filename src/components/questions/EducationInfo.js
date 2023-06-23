import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

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
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
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

    /*
    const addSkill = () => {
        // temp arr to store the current skill arr and add new skill
        var tempSkills = skillList;
        tempSkills.push(skillBarRef.current.value);
        // update useState var holding the arr
        setSkillList(tempSkills);
        //setSkillList((prevArray) => [...prevArray, skillBarRef.current.value]);
        // create array to turn each skill into an object that can be stored in json
        var arr = [];
        tempSkills.forEach((skill) => {
            arr.push({ name: skill, level: "", keywords: [] });
        });
        // update the resume data
        setResumeData({
            ...resumeData,
            skills: arr,
        });
    };
*/

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
        var st = startRef.current.value;
        // end date
        var en = endRef.current.value;
        // school highlights
        var hl = [];
        if (numHighlights >= 1) {
            hl.push(highlight1);
        }
        if (numHighlights >= 2) {
            hl.push(highlight2);
        }
        if (numHighlights >= 3) {
            hl.push(highlight3);
        }
        if (numHighlights >= 4) {
            hl.push(highlight4);
        }
        if (numHighlights >= 5) {
            hl.push(highlight5);
        }
        if (numHighlights >= 6) {
            hl.push(highlight6);
        }
        if (numHighlights >= 7) {
            hl.push(highlight7);
        }
        // ensure all the necessary values are filled
        if (ins === "" || deg === "" || st === "" || en === "") {
            alert("Fill out all of the fields.");
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
        // get the json jobs list
        var jsonWork = resumeData.education;
        // get the job to remove
        var jobToDelete = experienceList[event.target.id];
        // remove it from the list
        var updatedArr = jsonWork.filter(
            (item) => item.summary !== jobToDelete.summary
        );
        // update the resumeData
        setResumeData({
            ...resumeData,
            education: updatedArr,
        });
        // update the skillList
        var tempArr = experienceList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
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

    return (
        <div className="question-container">
            <h2>Education</h2>
            <p>Enter your education history in this section.</p>
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
                    <p>GPA</p>
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
                    <input
                        id="start"
                        ref={startRef}
                        placeholder="e.g. 10-18-2014"
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setStart(event.target.value);
                        }}
                        value={start}
                    ></input>
                </div>
                <div className="input-item">
                    <p>End Date</p>
                    <input
                        id="end"
                        ref={endRef}
                        placeholder="e.g. 10-18-2016"
                        className="short-input"
                        type="text"
                        onChange={(event) => {
                            setEnd(event.target.value);
                        }}
                        value={end}
                    ></input>
                </div>
            </div>
            <div className="job-summary">
                <div className="add-highlight-container">
                    <p>Highlights</p>
                    <button
                        className="minus-button"
                        onClick={removeHighlightInput}
                    >
                        -
                    </button>
                    <button className="plus-button" onClick={addHighlightInput}>
                        +
                    </button>
                </div>
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
                {experienceList.map((school, index) => (
                    <div className="experience-item">
                        <button
                            className="delete-experience-item-button"
                            id={index}
                            onClick={removeJob}
                        >
                            Delete
                        </button>
                        <h3>
                            {school.area} {school.studyType},{" "}
                            {school.institution}
                        </h3>
                        <p>
                            {school.startDate} - {school.endDate}
                        </p>
                        <p>GPA: {school.gpa}</p>
                        {school.courses.length > 0 && <h4>Highlights:</h4>}
                        <ul>
                            {school.courses.map((highlight, index) => (
                                <li>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                ))}
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
