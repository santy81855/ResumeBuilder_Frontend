import React, { useState, useEffect, useRef } from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/templates/ModernTemplate.css";
import userImage from "../../images/account-pics/option1.png";

const ModernTemplate = ({
    resumeData,
    setResumeData,
    isPreview,
    handleSectionChange,
    isExport,
}) => {
    const [divSize, setDivSize] = useState({ width: 0, height: 0 });
    const templateRef = useRef(null);
    const TEMPLATE_NAME = "Modern";

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

    const contact = resumeData.contact;
    const pictureURL =
        resumeData.picture.url !== ""
            ? resumeData.picture.url
            : "url('../../images/account-pics/option1.png')";
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

    useEffect(() => {
        console.log(education);
    }, []);

    const checkoverflow = () => {
        const content = document.getElementById("modern-template-content");
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

    const LanguagesSection = () => {
        return (
            <div
                className={
                    sectionClass + " vertical-block-section languages-section"
                }
                onClick={() => {
                    handleSectionChange(8);
                }}
            >
                <h2>Languages</h2>
                {horizontalLine}
                <div className="container">
                    {languages.map((language) => (
                        <p>
                            {language.language}{" "}
                            {resumeData.templateSections.modern.languages
                                .fluency && " - " + language.fluency}
                        </p>
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
                onClick={() => {
                    handleSectionChange(5);
                }}
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
                onClick={() => {
                    handleSectionChange(7);
                }}
            >
                <h2>Education</h2>
                {horizontalLine}
                {education.map((school) => (
                    <div className="container">
                        <p>
                            {resumeData.templateSections.modern.education
                                .startDate && getDate(school.startDate) + " - "}
                            {getDate(school.endDate)}
                        </p>
                        <h4>{school.area + " " + school.studyType}</h4>
                        <h4>{school.institution}</h4>
                        {school.gpa && <p>{"GPA: " + school.gpa}</p>}
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
                onClick={() => {
                    handleSectionChange(3);
                }}
            >
                <h2>Contact</h2>
                {horizontalLine}
                <div className="container">
                    {resumeData.templateSections.modern.contact.email && (
                        <div className="contact-info-entry">
                            <h3>Email</h3>
                            <p>{contact.email}</p>
                        </div>
                    )}
                    {resumeData.templateSections.modern.contact.phone && (
                        <div className="contact-info-entry">
                            <h3>Phone</h3>
                            <p>{contact.phone}</p>
                        </div>
                    )}
                    {resumeData.templateSections.modern.contact.website && (
                        <div className="contact-info-entry">
                            <h3>Website</h3>
                            <p>{contact.website}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    /*
            element.style.backgroundImage =
            "url('./images/account-pics/option1.png')";
        element.style.backgroundSize = "80%";
        element.style.backgroundPosition = "center";
        element.style.width = "100%";
        element.style.height = "15em";
    */

    const ImageSection = () => {
        return (
            <div
                style={{
                    backgroundImage: `url(${userImage})`,
                    backgroundSize: "80%",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "15em",
                    backgroundRepeat: "no-repeat",
                }}
                id="user-image"
                className="modern-image-container"
            ></div>
        );
    };

    const HeaderSection = () => {
        return (
            <div
                className={sectionClass + " right-section header-section"}
                onClick={() => {
                    handleSectionChange(4);
                }}
            >
                <h1>{contact.name}</h1>
                {resumeData.templateSections.modern.label.show && (
                    <h2>{label}</h2>
                )}
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
            <div
                className={sectionClass + " right-section experience-section"}
                onClick={() => {
                    handleSectionChange(6);
                }}
            >
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
                                <h3>
                                    {resumeData.templateSections.modern
                                        .experience.startDate &&
                                        getDate(job.startDate) + " - "}
                                    {getDate(job.endDate)}
                                </h3>
                                <h4>{job.company}</h4>
                                <h3>{job.position}</h3>

                                {resumeData.templateSections.modern.experience
                                    .summary && <p>{job.summary}</p>}
                                {resumeData.templateSections.modern.experience
                                    .highlights && (
                                    <ul>
                                        {job.highlights.map((highlight) => (
                                            <li>{highlight}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const InterestsSection = () => {
        return (
            <div
                className={sectionClass + " right-section interests-section"}
                onClick={() => {
                    handleSectionChange(9);
                }}
            >
                <h2>Interests</h2>
                {horizontalLine}
                <ul>
                    {interests.map((interest) => (
                        <li>
                            <h3>{interest.name}</h3>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

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
                        {resumeData.templateSections.modern.contact.show && (
                            <ContactSection />
                        )}
                        {resumeData.templateSections.modern.education.show && (
                            <EducationSection />
                        )}
                        {resumeData.templateSections.modern.skills.show && (
                            <SkillsSection />
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
