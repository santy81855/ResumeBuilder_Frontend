import React, { useState, useEffect, useRef } from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/templates/CleanTemplate.css";

const CleanTemplate = ({
    resumeData,
    setResumeData,
    isPreview,
    handleSectionChange,
    isExport,
}) => {
    const [divSize, setDivSize] = useState({ width: 0, height: 0 });
    const templateRef = useRef(null);
    const TEMPLATE_NAME = "Clean";
    useEffect(() => {
        // handle the text scaling
        function handleResize() {
            const { width, height } =
                templateRef.current.getBoundingClientRect();
            setDivSize({ width, height });
            console.log(width + " " + height);

            const template = templateRef.current;
            if (template) {
                let size = 11 * (width / 610);
                template.style.fontSize = size + "px";
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();

        // code for checking if the user already has a Clean entry in their json and if not then adding it

        // loop through their templates array, and if "Clean" is not in the array then add it
        // if the name is not there we add it

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const contact = resumeData.contact;
    const label = resumeData.label;
    const summary = resumeData.summary;
    const work = resumeData.work;
    const education = resumeData.education;
    const skills = resumeData.skills;
    const languages = resumeData.languages;
    const interests = resumeData.interests;

    const [name, setName] = useState(contact.name);

    const sectionClass = isPreview
        ? "clean-resume-section-preview"
        : "clean-resume-section";

    const checkoverflow = () => {
        const contentHeight = document.getElementById(
            "clean-template-content"
        ).clientHeight;
        const container = document.getElementById("clean-template");

        const containerHeightWithoutPadding =
            container.clientHeight -
            parseFloat(getComputedStyle(container).paddingTop) -
            parseFloat(getComputedStyle(container).paddingBottom);
        console.log(contentHeight);
        console.log(containerHeightWithoutPadding);
        if (contentHeight > containerHeightWithoutPadding) {
            console.log("overflow");
        } else {
            console.log("no overflow");
        }
    };

    const SummarySection = () => {
        return (
            <div
                className={sectionClass + " summary-section"}
                onClick={() => {
                    handleSectionChange(2);
                }}
            >
                <hr />
                <h3>Summary</h3>
                <p>{summary}</p>
            </div>
        );
    };
    const SkillsSection = () => {
        return (
            <div
                className={sectionClass + " skills-section"}
                onClick={() => {
                    handleSectionChange(5);
                }}
            >
                <hr />
                <h3>Skills</h3>
                <ul className="horizontal-list">
                    {skills.map((skill) => (
                        <li>{skill.name}</li>
                    ))}
                </ul>
            </div>
        );
    };

    const LanguagesSection = () => {
        return (
            <div className={sectionClass + " languages-section"}>
                <hr />
                <h3>Languages</h3>
                <ul>
                    {languages.map((language) => (
                        <li>
                            {language.language}
                            {resumeData.templateSections.clean.languages
                                .fluency && " - " + language.fluency}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const ExperienceSection = () => {
        return (
            <div
                className={sectionClass + " experience-section"}
                onClick={() => {
                    handleSectionChange(6);
                }}
            >
                <hr />
                <h3>Experience</h3>
                {work.map((job) => (
                    <div className="job-container">
                        <h3>{job.position + ", " + job.company}</h3>
                        <p>
                            {resumeData.templateSections.clean.experience
                                .startDate && job.startDate + " - "}
                            {job.endDate}
                        </p>
                        {resumeData.templateSections.clean.experience
                            .summary && <p>{job.summary}</p>}
                        {resumeData.templateSections.clean.experience
                            .highlights && (
                            <ul>
                                {job.highlights.map((highlight) => (
                                    <li>{highlight}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        );
    };
    const EducationSection = () => {
        return (
            <div className={sectionClass + " education-section"}>
                <hr />
                <h3>Education</h3>
                {education.map((school) => (
                    <div className="school-container">
                        <h3>
                            {school.area +
                                " " +
                                school.studyType +
                                ", " +
                                school.institution}
                        </h3>
                        <p>
                            {resumeData.templateSections.clean.education
                                .startDate && school.startDate + " - "}
                            {school.endDate}
                        </p>
                        {resumeData.templateSections.clean.education.gpa && (
                            <p>{"GPA: " + school.gpa}</p>
                        )}
                        {resumeData.templateSections.clean.education
                            .courses && <p>Relevant Coursework:</p>}
                        {resumeData.templateSections.clean.education
                            .courses && (
                            <ul>
                                {school.courses.map((course) => (
                                    <li>{course}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        );
    };
    const HeaderSection = () => {
        return (
            <div className="header-section">
                <div
                    className={sectionClass + " header-name"}
                    onClick={() => {
                        handleSectionChange(4);
                    }}
                >
                    <div className={sectionClass + " header-name-label"}>
                        <h3>{contact.name}</h3>
                        {resumeData.templateSections.clean.label.show && (
                            <h3>{label}</h3>
                        )}
                    </div>
                </div>

                {resumeData.templateSections.clean.contact.show && (
                    <div
                        className={sectionClass + " header-contact-info"}
                        onClick={() => {
                            handleSectionChange(3);
                        }}
                    >
                        {resumeData.templateSections.clean.contact.email && (
                            <p>{contact.email}</p>
                        )}
                        {resumeData.templateSections.clean.contact.phone && (
                            <p>{contact.phone}</p>
                        )}
                        {resumeData.templateSections.clean.contact.website && (
                            <p>{contact.website}</p>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="clean-template-container" id="clean-template-container">
            <div
                className="clean-template"
                ref={templateRef}
                id={isExport ? "template-to-print" : "modern-template"}
            >
                <div
                    className="clean-template-content"
                    id="clean-template-content"
                >
                    <HeaderSection />
                    {resumeData.templateSections.clean.summary.show && (
                        <SummarySection />
                    )}
                    {resumeData.templateSections.clean.skills.show && (
                        <SkillsSection />
                    )}
                    {resumeData.templateSections.clean.experience.show && (
                        <ExperienceSection />
                    )}
                    {resumeData.templateSections.clean.education.show && (
                        <EducationSection />
                    )}
                    {resumeData.templateSections.clean.languages.show && (
                        <LanguagesSection />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CleanTemplate;
