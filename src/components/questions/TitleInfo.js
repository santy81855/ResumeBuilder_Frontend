import React, { useState, useRef } from "react";
import "../../styles/questions/ResumeInput.css";
import Loader from "../ui/Loader";

const TitleInfo = ({
    resumeData,
    setResumeData,
    handleSave,
    closeModal,
    isLoadingState,
}) => {
    const [name, setName] = useState(resumeData.contact.name);
    const [label, setLabel] = useState(resumeData.label);

    const nameRef = useRef();
    const labelRef = useRef();
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
            case "label":
                var value = labelRef.current.value;
                setLabel(value);
                setResumeData({
                    ...resumeData,
                    label: value,
                });
                return;
            default:
                return;
        }
    };

    return (
        <div className="question-container">
            <h2>Contact Information</h2>
            <h3>
                Describe your work experience, skills, and achievements in a
                concise and informative manner in this section.
            </h3>
            <p>
                This section should highlight your unique value proposition as a
                candidate and grab the attention of the hiring manager.
            </p>
            <div>
                <p>Name</p>
                <input
                    id="name"
                    ref={nameRef}
                    className="short-input"
                    type="text"
                    onChange={handleChange}
                    value={name}
                ></input>
            </div>
            <p>Label</p>
            <input
                id="label"
                ref={labelRef}
                className="short-input"
                type="text"
                onChange={handleChange}
                value={label}
            ></input>

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

export default TitleInfo;
