import React, { useState, useRef, useEffect } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const InterestsInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
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
        console.log("tempArr");
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
        var jsonInterests = resumeData.interests;
        // get the skill "name" to remove
        var nameToDelete = interestList[event.target.id];
        console.log(interestList[event.target.id]);
        // remove it from the list
        const index = jsonInterests.findIndex(
            (item) => item.name === nameToDelete
        );
        if (index > -1) {
            jsonInterests.splice(index, 1);
        }
        // update the resumeData
        setResumeData({
            ...resumeData,
            interests: jsonInterests,
        });
        // update the interestList
        var tempArr = interestList;
        // remove the skill based on its index
        tempArr.splice(event.target.id, 1);
        setInterestList(tempArr);
    };

    return (
        <div className="question-container">
            <div className="header">
                <h2>Interests</h2>
                <h3>Include any of your interests.</h3>
                <p>
                    Including interests can help portray you as a well-rounded
                    individual with diverse passions and hobbies outside of
                    work. It provides employers with a glimpse into your
                    personality and can help establish a connection beyond your
                    professional qualifications. Sharing interests can make you
                    more relatable and memorable, potentially setting you apart
                    from other candidates.
                </p>
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
                <button onClick={addInterest}>+</button>
            </div>
            <div className="skill-container">
                {interestList.map((skill, index) => (
                    <div id={index} className="skill-item">
                        <p>{skill}</p>
                        <button id={index} onClick={removeInterest}>
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

export default InterestsInfo;
