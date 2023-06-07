import React, { useState, useRef, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const SkillsInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [name, setName] = useState(resumeData.contact.name);
    const [email, setEmail] = useState(resumeData.contact.email);
    const [phone, setPhone] = useState(resumeData.contact.phone);
    const [website, setWebsite] = useState(resumeData.contact.website);

    const [skillList, setSkillList] = useState([]);

    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const websiteRef = useRef();

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

    // update resumeData useState variable everytime textbox is edited
    const handleChange = (event) => {
        switch (event.target.id) {
            case "name":
                var value = nameRef.current.value;
                setName(value);
                setResumeData({
                    ...resumeData,
                    contact: {
                        ...resumeData.contact,
                        name: value,
                    },
                });
                return;
            case "email":
                var value = emailRef.current.value;
                setEmail(value);
                setResumeData({
                    ...resumeData,
                    contact: {
                        ...resumeData.contact,
                        email: value,
                    },
                });
                return;
            case "phone":
                var value = phoneRef.current.value;
                setPhone(value);
                setResumeData({
                    ...resumeData,
                    contact: {
                        ...resumeData.contact,
                        phone: value,
                    },
                });
                return;
            case "website":
                var value = websiteRef.current.value;
                setWebsite(value);
                setResumeData({
                    ...resumeData,
                    contact: {
                        ...resumeData.contact,
                        website: value,
                    },
                });
            default:
                return;
        }
    };

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
            <h2>Skills</h2>
            <h3>Write any relevant skills.</h3>
            <p>
                Be specific and relevant: Instead of listing generic skills, try
                to be specific and tailor your skills to the job or industry
                you're applying for. Consider including skills that directly
                align with the job requirements or skills that demonstrate your
                expertise in a particular area. This will help employers quickly
                identify your relevant skills and qualifications.
            </p>
            <div className="skill-input-container">
                <input
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
