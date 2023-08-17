import React, { useState, useRef, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";
import { useTranslation, Trans } from "react-i18next";

const InterestsInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const { i18n, t } = useTranslation();
    const [interestList, setInterestList] = useState([]);
    const [interestInput, setInterestInput] = useState("");

    const interestBarRef = useRef();

    useEffect(() => {
        var interests = resumeData.interests;
        var tempArr = [];
        interests.forEach((element) => {
            tempArr.push(element.name);
        });
        setInterestList(tempArr);
    }, []);

    const addInterest = () => {
        // temp arr to store the current skill arr and add new skill
        var tempInterest = interestList;
        tempInterest.push(interestBarRef.current.value);
        // update useState var holding the arr
        setInterestList(tempInterest);
        //setInterestList((prevArray) => [...prevArray, interestBarRef.current.value]);
        // create array to turn each skill into an object that can be stored in json
        var arr = [];
        tempInterest.forEach((interest) => {
            arr.push({ name: interest, keywords: [] });
        });
        // update the resume data
        setResumeData({
            ...resumeData,
            interests: arr,
        });
        setInterestInput("");
    };

    const removeInterest = (event) => {
        // get the json skills list
        var jsonInterests = [];
        interestList.forEach((interest) => {
            jsonInterests.push({ name: interest, keywords: [] });
        });
        jsonInterests.splice(event.target.id, 1);
        // update the resumeData
        setResumeData({
            ...resumeData,
            interests: jsonInterests,
        });
        // update the interestList
        var tempArr = [];
        jsonInterests.forEach((element) => {
            tempArr.push(element.name);
        });
        setInterestList(tempArr);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>{t("resumeInterests.title")}</h2>
                <h3>{t("resumeInterests.description1")}</h3>
                <p>{t("resumeInterests.description2")}</p>
            </div>
            <div className="skill-input-container">
                <input
                    ref={interestBarRef}
                    placeholder="e.g. Volunteer Work"
                    className="skill-input-bar-long"
                    value={interestInput}
                    onChange={(event) => {
                        setInterestInput(event.currentTarget.value);
                    }}
                ></input>
                <button onClick={addInterest}>
                    {t("resumeInterests.add")}
                </button>
            </div>
            <div className="skill-container">
                {interestList.map((skill, index) => (
                    <div key={index} className="skill-item">
                        <p>{skill}</p>
                        <button key={index} id={index} onClick={removeInterest}>
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
                    {t("resumeInterests.back")}
                </button>

                <button
                    className="question-container-apply-button"
                    onClick={handleSave}
                    disabled={isLoadingState}
                >
                    {isLoadingState ? <Loader /> : t("resumeInterests.apply")}
                </button>
            </div>
        </div>
    );
};

export default InterestsInfo;
