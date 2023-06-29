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
            checkoverflow();
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
        const content = document.getElementById("clean-template-content");
        // check if it is overflowing by more than like 2 pixels
        if (content.scrollHeight - content.clientHeight > 2) {
            console.log(content.scrollHeight);
            console.log(content.clientHeight);

            const bigRect = content.getBoundingClientRect();

            const children = content.children;
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const childRect = child.getBoundingClientRect();

                if (childRect.bottom > bigRect.bottom) {
                    console.log("overflow in child: ");
                    console.log(child);
                }
            }
        } else {
            console.log("no overflow");
        }
    };

    const getDate = (date) => {
        const d = new Date(date);
        const options = { year: "numeric", month: "short" };
        const res = d.toLocaleDateString("en-us", options);
        return res === "Invalid Date" ? "Current" : res;
    };

    const SummarySection = () => {
        return (
            <div
                className={sectionClass + " section"}
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
                className={sectionClass + " section"}
                onClick={() => {
                    handleSectionChange(5);
                }}
            >
                <hr />
                <h3>Skills</h3>
                <div className="bullet-list-container">
                    {skills.map((skill) => (
                        <div className="bullet-item">
                            <div className="bullet"></div>
                            {skill.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const InterestsSection = () => {
        return (
            <div
                className={sectionClass + " section"}
                onClick={() => {
                    handleSectionChange(9);
                }}
            >
                <hr />
                <h3>Interests</h3>
                <div className="bullet-list-container">
                    {interests.map((interest) => (
                        <div className="bullet-item">
                            <div className="bullet"></div>
                            {interest.name}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const LanguagesSection = () => {
        return (
            <div
                className={sectionClass + " section"}
                onClick={() => {
                    handleSectionChange(8);
                }}
            >
                <hr />
                <h3>Languages</h3>
                <div className="bullet-list-container">
                    {languages.map((language) => (
                        <div className="bullet-item">
                            <div className="bullet"></div>
                            {language.language}
                            {resumeData.templateSections.clean.languages
                                .fluency && " - " + language.fluency}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const ExperienceSection = () => {
        return (
            <div
                className={sectionClass + " section"}
                onClick={() => {
                    handleSectionChange(6);
                }}
            >
                <hr />
                <h3>Experience</h3>
                <div className="job-container">
                    {work.map((job) => (
                        <div className="job-item">
                            <h4>
                                {resumeData.templateSections.clean.experience
                                    .startDate &&
                                    getDate(job.startDate) + " - "}
                                {getDate(job.endDate)}
                            </h4>
                            <h4>{job.position + ", " + job.company}</h4>
                            {resumeData.templateSections.clean.experience
                                .summary && <p>{job.summary}</p>}
                            {resumeData.templateSections.clean.experience
                                .highlights && (
                                <div className="bullet-list-container">
                                    {job.highlights.map((highlight) => (
                                        <div className="bullet-item">
                                            <div className="bullet"></div>
                                            {highlight}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const EducationSection = () => {
        return (
            <div
                className={sectionClass + " section"}
                onClick={() => {
                    handleSectionChange(7);
                }}
            >
                <hr />
                <h3>Education</h3>
                {education.map((school) => (
                    <div>
                        <h4>
                            {school.area +
                                " " +
                                school.studyType +
                                ", " +
                                school.institution}
                        </h4>
                        <h4>
                            {resumeData.templateSections.clean.education
                                .startDate && getDate(school.startDate) + " - "}
                            {getDate(school.endDate)}
                        </h4>

                        {resumeData.templateSections.clean.education.gpa &&
                            school.gpa && <p>{"GPA: " + school.gpa}</p>}
                        {resumeData.templateSections.clean.education
                            .courses && (
                            <div className="bullet-list-container">
                                {school.courses.map((course) => (
                                    <div className="bullet-item">
                                        <div className="bullet"></div>
                                        {course}
                                    </div>
                                ))}
                            </div>
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
                    className={sectionClass + " header-label"}
                    onClick={() => {
                        handleSectionChange(4);
                    }}
                >
                    <h3>{contact.name}</h3>
                    {resumeData.templateSections.clean.label.show && (
                        <h3>{label}</h3>
                    )}
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
                id={isExport ? "template-to-print" : "clean-template"}
            >
                <div
                    className="clean-template-content"
                    id="clean-template-content"
                >
                    <HeaderSection />
                    {resumeData.templateSections.clean.summary.show && (
                        <SummarySection />
                    )}
                    {resumeData.templateSections.clean.education.show && (
                        <EducationSection />
                    )}
                    {resumeData.templateSections.clean.experience.show && (
                        <ExperienceSection />
                    )}
                    {resumeData.templateSections.clean.skills.show && (
                        <SkillsSection />
                    )}
                    {resumeData.templateSections.clean.languages.show && (
                        <LanguagesSection />
                    )}
                    {resumeData.templateSections.clean.interests.show && (
                        <InterestsSection />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CleanTemplate;
