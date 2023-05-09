import React, { useState, useEffect, useRef } from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/templates/ModernTemplate.css";
import pictureURLTest from "../../images/account-pics/option1.png";

const ModernTemplate = ({
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
        console.log(resumeData.templateSections.modern.image);
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

    function sectionMouseOver(e) {
        if (isPreview === false) {
            const resumeSection = e.target.closest(".modern-resume-section");
            resumeSection.style.backgroundColor = "rgba(0, 128, 128, 0.5)";
            resumeSection.style.cursor = "pointer";
            //e.target.style.backgroundColor = "red";
        }
    }

    function sectionMouseOut(e) {
        if (isPreview === false) {
            const resumeSection = e.target.closest(".modern-resume-section");
            resumeSection.style.backgroundColor = "white";
            //e.target.style.backgroundColor = "white";
        }
    }

    const contact = resumeData.contact;
    const pictureURL = resumeData.picture.url;
    const label = resumeData.label;
    const summary = resumeData.summary;
    const work = resumeData.work;
    const education = resumeData.education;
    const skills = resumeData.skills;
    const languages = resumeData.languages;
    const interests = resumeData.interests;
    const horizontalLine = <div className="horizontal-line" />;

    const sectionClass = isPreview
        ? "modern-resume-section-preview"
        : "modern-resume-section";

    const checkoverflow = () => {
        const contentHeight = document.getElementById(
            "modern-template-content"
        ).clientHeight;
        const container = document.getElementById("modern-template");

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

    const LanguagesSection = () => {
        return (
            <div
                className={
                    sectionClass + " vertical-block-section languages-section"
                }
                onClick={checkoverflow}
            >
                <h2>Languages</h2>
                {horizontalLine}
                <div className="container">
                    {languages.map((language) => (
                        <p>{language.language + " - " + language.fluency}</p>
                    ))}
                </div>
            </div>
        );
    };

    const SkillsSection = () => {
        return (
            <div
                className={
                    sectionClass + " vertical-block-section skills-section"
                }
                onClick={checkoverflow}
            >
                <h2>Skills</h2>
                {horizontalLine}
                <div className="container">
                    {skills.map((skill) => (
                        <p>{skill.name}</p>
                    ))}
                </div>
            </div>
        );
    };

    const EducationSection = () => {
        return (
            <div
                className={
                    sectionClass + " vertical-block-section education-section"
                }
            >
                <h2>Education</h2>
                {horizontalLine}
                {education.map((school) => (
                    <div className="container">
                        <p>{school.endDate}</p>
                        <h4>{school.area + " " + school.studyType}</h4>
                        <h4>{school.institution}</h4>
                        <p>{"GPA: " + school.gpa}</p>
                    </div>
                ))}
            </div>
        );
    };
    const ContactSection = () => {
        return (
            <div
                className={
                    sectionClass + " vertical-block-section contact-section"
                }
            >
                <h2>Contact</h2>
                {horizontalLine}
                <div className="container">
                    <div className="contact-info-entry">
                        <h3>Email</h3>
                        <p>{contact.email}</p>
                    </div>
                    <div className="contact-info-entry">
                        <h3>Phone</h3>
                        <p>{contact.phone}</p>
                    </div>
                    <div className="contact-info-entry">
                        <h3>Website</h3>
                        <p>{contact.website}</p>
                    </div>
                </div>
            </div>
        );
    };

    const ImageSection = () => {
        return <div className="modern-image-container"></div>;
    };

    const HeaderSection = () => {
        return (
            <div className={sectionClass + " right-section header-section"}>
                <h1>{contact.name}</h1>
                <h2>{label}</h2>
            </div>
        );
    };
    const SummarySection = () => {
        return (
            <div
                className={sectionClass + " right-section summary-section"}
                onClick={() => {
                    handleSectionChange(2);
                }}
            >
                <p>{summary}</p>
            </div>
        );
    };

    const ExperienceSection = () => {
        return (
            <div className={sectionClass + " right-section experience-section"}>
                <h2>Experience</h2>
                {horizontalLine}

                <div className="container">
                    {work.map((job) => (
                        <div className="job-progress-bar-container">
                            <div className="job-progress-bar">
                                <div className="circle"></div>
                                <div className="line"></div>
                            </div>
                            <div className="job-container">
                                <h3>{job.startDate + " - " + job.endDate}</h3>
                                <h4>{job.company}</h4>
                                <h3>{job.position}</h3>

                                <p>{job.summary}</p>
                                <ul>
                                    {job.highlights.map((highlight) => (
                                        <li>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const InterestsSection = () => {
        return (
            resumeData.templateSections.modern.interests && (
                <div
                    className={
                        sectionClass + " right-section interests-section"
                    }
                >
                    <h2>Interests</h2>
                    {horizontalLine}
                    <div className="container">
                        {interests.map((interest) => (
                            <h4>{interest.name}</h4>
                        ))}
                    </div>
                </div>
            )
        );
    };

    const hi = <div>hi</div>;
    return (
        <div
            className="modern-template-container"
            id="modern-template-container"
        >
            <div
                className="modern-template"
                ref={templateRef}
                id={isExport ? "template-to-print" : "modern-template"}
            >
                <div
                    className="modern-template-content"
                    id="modern-template-content"
                >
                    <div className="modern-vertical-block">
                        {resumeData.templateSections.modern.image.show && (
                            <ImageSection />
                        )}
                        {resumeData.templateSections.modern.contact.show && (
                            <ContactSection />
                        )}
                        {resumeData.templateSections.modern.skills.show && (
                            <SkillsSection />
                        )}
                        {resumeData.templateSections.modern.education.show && (
                            <EducationSection />
                        )}
                        {resumeData.templateSections.modern.languages.show && (
                            <LanguagesSection />
                        )}
                    </div>
                    <div className="modern-right-container">
                        <HeaderSection />
                        {resumeData.templateSections.modern.summary.show && (
                            <SummarySection />
                        )}
                        {resumeData.templateSections.modern.experience.show && (
                            <ExperienceSection />
                        )}
                        {resumeData.templateSections.modern.interests.show && (
                            <InterestsSection />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
