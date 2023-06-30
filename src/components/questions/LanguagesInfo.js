import React, { useState, useRef, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const LanguagesInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [languageList, setLanguageList] = useState([]);
    const [languageInput, setLanguageInput] = useState("");

    const languageBarRef = useRef();

    useEffect(() => {
        var languages = resumeData.languages;
        var tempArr = [];
        languages.forEach((element) => {
            tempArr.push(element.language);
        });
        setLanguageList(tempArr);
    }, []);

    const addLanguage = () => {
        // temp arr to store the current skill arr and add new skill
        var tempLanguages = languageList;
        tempLanguages.push(languageBarRef.current.value);
        // update useState var holding the arr
        setLanguageList(tempLanguages);
        //setLanguageList((prevArray) => [...prevArray, languageBarRef.current.value]);
        // create array to turn each skill into an object that can be stored in json
        var arr = [];
        tempLanguages.forEach((lang) => {
            arr.push({ language: lang, fluency: "Advanced" });
        });
        // update the resume data
        setResumeData({
            ...resumeData,
            languages: arr,
        });
        setLanguageInput("");
    };

    const removeLanguage = (event) => {
        // get the json skills list
        var jsonLangs = resumeData.languages;
        // get the skill "name" to remove
        var nameToDelete = languageList[event.target.id];
        // remove it from the list
        const index = jsonLangs.findIndex(
            (item) => item.language === nameToDelete
        );
        if (index > -1) {
            jsonLangs.splice(index, 1);
        }

        // update the resumeData
        setResumeData({
            ...resumeData,
            languages: jsonLangs,
        });
        // update the languageList
        var tempArr = languageList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
        setLanguageList(tempArr);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Languages</h2>
                <h3>Include any languages that you are proficient in.</h3>
                <p>
                    Including languages in a resume can provide several benefits
                    and can be seen as a valuable asset by employers
                </p>
            </div>
            <div className="skill-input-container">
                <input
                    ref={languageBarRef}
                    placeholder="e.g. French"
                    className="skill-input-bar"
                    value={languageInput}
                    onChange={(event) => {
                        setLanguageInput(event.currentTarget.value);
                    }}
                ></input>
                <button onClick={addLanguage}>+</button>
            </div>

            <div className="skill-container">
                {languageList.map((skill, index) => (
                    <div key={index} className="skill-item">
                        <p>{skill}</p>
                        <button key={index} onClick={removeLanguage}>
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

export default LanguagesInfo;
