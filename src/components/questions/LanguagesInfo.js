import React, { useState, useRef, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useTranslation, Trans } from "react-i18next";

const LanguagesInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const { i18n, t } = useTranslation();
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
        var jsonLangs = [];
        languageList.forEach((lang) => {
            jsonLangs.push({ language: lang, fluency: "Advanced" });
        });
        jsonLangs.splice(event.target.id, 1);
        // update the resumeData
        setResumeData({
            ...resumeData,
            languages: jsonLangs,
        });
        // update the languageList
        var tempArr = [];
        jsonLangs.forEach((element) => {
            tempArr.push(element.language);
        });
        setLanguageList(tempArr);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("resumeLanguages.title")}</h2>
                <h3>{t("resumeLanguages.description1")}</h3>
                <p>{t("resumeLanguages.description2")}</p>
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
                <button onClick={addLanguage}>
                    {t("resumeLanguages.add")}
                </button>
            </div>

            <div className="skill-container">
                {languageList.map((skill, index) => (
                    <div key={index} className="skill-item">
                        <p>{skill}</p>
                        <button key={index} id={index} onClick={removeLanguage}>
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
                    {t("resumeLanguages.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("resumeLanguages.apply")}
                </button>
            </div>
        </div>
    );
};

export default LanguagesInfo;
