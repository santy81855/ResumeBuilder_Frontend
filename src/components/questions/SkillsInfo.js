import React, { useState, useRef, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendChat } from "../../api/ai/AIRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    var prompt = { content: "" };

    const getAIResponse = useQuery(
        ["getAIResponse", prompt], // query key including variables
        () => sendChat(prompt), // call sendChat with the variables
        {
            onSuccess: (data) => {
                console.log(data.result.content);
                setSkillInput(data.result.content);
            },
            onError: (error) => {
                console.log("Error getting AI response. Error:", error);
            },
            enabled: false,
        }
    );

    // Function to trigger the query
    const fetchAIResponse = (newVariables) => {
        prompt = { content: newVariables };
        getAIResponse.refetch();
    };

    const clear = () => {
        setSkillInput("");
    };

    const enhance = () => {
        if (skillInput === "") {
            toast.info("There is nothing to enhance.", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            var userPrompt =
                "enhance the following resume skill to make it more professional and to make it better for applying to be a " +
                jobTitle +
                ", but keep it under 15 words: " +
                skillInput;
            fetchAIResponse(userPrompt);
        }
    };

    const generate = () => {
        setSkillInput("");
        var userPrompt =
            "write a 15 words or less resume skill that is useful and professional for applying to be a " +
            jobTitle;
        console.log(userPrompt);
        fetchAIResponse(userPrompt);
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
                <div className="input-and-prompt-container">
                    <input
                        value={skillInput}
                        onChange={(event) => {
                            setSkillInput(event.currentTarget.value);
                        }}
                        ref={skillBarRef}
                        placeholder="e.g. Team Management"
                        className="skill-input-bar"
                    ></input>
                    <div className="prompt-buttons">
                        <div className="left">
                            <button className="enhance-button" onClick={clear}>
                                Clear
                            </button>
                        </div>
                        <div className="right">
                            <button
                                className="enhance-button"
                                onClick={enhance}
                            >
                                enhance
                            </button>
                            <button
                                className="enhance-button"
                                onClick={generate}
                            >
                                generate
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={addSkill}>Add</button>
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
