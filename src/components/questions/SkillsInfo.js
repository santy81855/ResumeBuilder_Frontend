import React, { useState, useRef, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sendChat } from "../../api/ai/AIRequests";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation, Trans } from "react-i18next";
import { useAppState } from "../../AppStateContext";

const SkillsInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
    jobTitle,
}) => {
    const { i18n, t } = useTranslation();
    const { appState, setAppState } = useAppState();
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
    }, []);

    var prompt = { content: "" };

    const getAIResponse = useQuery(
        ["getAIResponse", prompt], // query key including variables
        () => sendChat(prompt), // call sendChat with the variables
        {
            onSuccess: (data) => {
                setSkillInput(data.result.content);
            },
            onError: (error) => {
                console.log(error);
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
            toast.info(t("resumeSkills.enhanceErrorToast"), {
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
                skillInput +
                " and write the response in " +
                appState.language;
            fetchAIResponse(userPrompt);
        }
    };

    const generate = () => {
        setSkillInput("");
        var userPrompt =
            "write a 15 words or less resume skill that is useful and professional for applying to be a " +
            jobTitle +
            " and it should be something different from the following: " +
            skillList.toString() +
            " and write the response in " +
            appState.language;
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
        var jsonSkills = [];
        skillList.forEach((skill) => {
            jsonSkills.push({ name: skill, level: "", keywords: [] });
        });
        jsonSkills.splice(event.target.id, 1);
        // update the resumeData
        setResumeData({
            ...resumeData,
            skills: jsonSkills,
        });
        var tempArr = [];
        jsonSkills.forEach((element) => {
            tempArr.push(element.name);
        });
        setSkillList(tempArr);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("resumeSkills.title")}</h2>
                <h3>{t("resumeSkills.description1")}</h3>
                <p>{t("resumeSkills.description2")}</p>
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
                                {t("resumeSkills.clear")}
                            </button>
                        </div>
                        <div className="right">
                            <button
                                className="enhance-button"
                                onClick={enhance}
                            >
                                {t("resumeSkills.enhance")}
                            </button>
                            <button
                                className="enhance-button"
                                onClick={generate}
                            >
                                {t("resumeSkills.generate")}
                            </button>
                        </div>
                    </div>
                </div>
                <button onClick={addSkill}>{t("resumeSkills.add")}</button>
            </div>

            <div className="skill-container">
                {skillList.map((skill, index) => (
                    <div key={index} className="skill-item">
                        <p>{skill}</p>
                        <button key={index} id={index} onClick={removeSkill}>
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
                    {t("resumeSkills.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("resumeSkills.apply")}
                </button>
            </div>
        </div>
    );
};

export default SkillsInfo;
