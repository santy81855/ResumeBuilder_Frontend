import React, { useState, useRef, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const SkillsInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
    jobTitle,
}) => {
    const [skillList, setSkillList] = useState([]);
    const [skillInput, setSkillInput] = useState("");

    const skillBarRef = useRef();

    useEffect(() => {
        var skills = resumeData.skills;
        var tempArr = [];
        skills.forEach((element) => {
            tempArr.push(element.name);
        });
        setSkillList(tempArr);
        console.log("tempArr");
    }, []);

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
        setSkillInput("");
    };

    const removeSkill = (event) => {
        // get the json skills list
        var jsonSkills = resumeData.skills;
        // get the skill "name" to remove
        var nameToDelete = skillList[event.target.id];
        console.log(skillList[event.target.id]);
        // remove it from the list
        var updatedArr = jsonSkills.filter(
            (item) => item.name !== nameToDelete
        );
        // update the resumeData
        setResumeData({
            ...resumeData,
            skills: updatedArr,
        });
        // update the skillList
        var tempArr = skillList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
        setSkillList(tempArr);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Skills</h2>
                <h3>Write any relevant skills.</h3>
                <p>
                    Be specific and relevant: Instead of listing generic skills,
                    try to be specific and tailor your skills to the job or
                    industry you're applying for. Consider including skills that
                    directly align with the job requirements or skills that
                    demonstrate your expertise in a particular area. This will
                    help employers quickly identify your relevant skills and
                    qualifications.
                </p>
            </div>
            <div className="skill-input-container">
                <input
                    value={skillInput}
                    onChange={(event) => {
                        setSkillInput(event.currentTarget.value);
                    }}
                    ref={skillBarRef}
                    placeholder="e.g. Team Management"
                    className="skill-input-bar"
                ></input>
                <button onClick={addSkill}>+</button>
            </div>
            <div className="skill-container">
                {skillList.map((skill, index) => (
                    <div id={index} className="skill-item">
                        <p>{skill}</p>
                        <button id={index} onClick={removeSkill}>
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

export default SkillsInfo;
