import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const ExperienceInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [company, setCompany] = useState("");
    const [position, setPosition] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [summary, setSummary] = useState("");
    const [highlights, setHighlights] = useState([]);

    const [experienceList, setExperienceList] = useState(resumeData.work);

    const companyRef = useRef();
    const positionRef = useRef();
    const startRef = useRef();
    const endRef = useRef();
    const summaryRef = useRef();
    const highlightsRef = useRef();

    // update resumeData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            default:
                return;
        }
    };
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
    const removeJob = (event) => {
        // get the json jobs list
        var jsonWork = resumeData.work;
        // get the job to remove
        var jobToDelete = experienceList[event.target.id];
        // remove it from the list
        var updatedArr = jsonWork.filter(
            (item) => item.summary !== jobToDelete.summary
        );
        // update the resumeData
        setResumeData({
            ...resumeData,
            work: updatedArr,
        });
        // update the skillList
        var tempArr = experienceList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
        setExperienceList(tempArr);
    };

    return (
        <div className="question-container">
            <h2>Employment History</h2>
            <p>Enter your work experience in this section.</p>
            <div className="input-container-horizontal">
                <div className="input-item">
                    <p>Company</p>
                    <input
                        id="company"
                        ref={companyRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={company}
                    ></input>
                </div>
                <div className="input-item">
                    <p>Position</p>
                    <input
                        id="position"
                        ref={positionRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={position}
                    ></input>
                </div>
                <div className="input-item">
                    <p>Start Date</p>
                    <input
                        id="start"
                        ref={startRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={start}
                    ></input>
                </div>
                <div className="input-item">
                    <p>End Date</p>
                    <input
                        id="end"
                        ref={endRef}
                        className="short-input"
                        type="text"
                        onChange={handleChange}
                        value={end}
                    ></input>
                </div>
            </div>
            <div className="input-item job-summary">
                <p>Job Summary</p>
                <textarea
                    ref={summaryRef}
                    className="job-summary"
                    placeholder="+ Write your summary here."
                    type="text"
                    name="summary"
                    value={summary}
                    rows="10"
                />
            </div>
            <div className="experience-history-container">
                {experienceList.map((job, index) => (
                    <div className="experience-item">
                        <h3>
                            {job.position}, {job.company}
                        </h3>
                        <p>
                            {job.startDate} - {job.endDate}
                        </p>
                        <p>{job.summary}</p>
                        <ul>
                            {job.highlights.map((highlight, index) => (
                                <li>{highlight}</li>
                            ))}
                        </ul>
                        <button id={index} onClick={removeJob}>
                            x
                        </button>
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

export default ExperienceInfo;
