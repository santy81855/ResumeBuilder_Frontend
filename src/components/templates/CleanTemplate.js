import React, { useState, useEffect, useRef } from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/templates/CleanTemplate.css";

const CleanTemplate = ({ resumeData, isPreview, handleSectionChange }) => {
    const [divSize, setDivSize] = useState({ width: 0, height: 0 });
    const templateRef = useRef(null);

    useEffect(() => {
        if (isPreview === true) {
            console.log("hi");
        }
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

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const exportPDF = () => {
        const content = document.getElementById("template");
        savePDF(content, {
            paperSize: "Letter",
            margin: 0,
            fileName: "resume.pdf",
            landscape: false,
            pdf: {
                multiPage: false,
                font: "Arial",
                fontSize: 12,
            },
        });
    };

    function sectionMouseOver(e) {
        if (isPreview === false) {
            const resumeSection = e.target.closest(".resume-section");
            resumeSection.style.backgroundColor = "rgba(0, 128, 128, 0.5)";
            resumeSection.style.cursor = "pointer";
            //e.target.style.backgroundColor = "red";
        }
    }

    function sectionMouseOut(e) {
        if (isPreview === false) {
            const resumeSection = e.target.closest(".resume-section");
            resumeSection.style.backgroundColor = "white";
            //e.target.style.backgroundColor = "white";
        }
    }

    const { name, label, email, phone, website, summary, location, profiles } =
        resumeData.basics;
    const work = resumeData.work;
    const education = resumeData.education;
    const skills = resumeData.skills;
    const languages = resumeData.languages;
    const interests = resumeData.interests;

    const exportPDFButton = (
        <button className="export-button" onClick={exportPDF}>
            Download PDF
        </button>
    );
    const summarySection = (
        <div
            className="summary-section resume-section"
            onMouseOver={sectionMouseOver}
            onMouseOut={sectionMouseOut}
            onClick={() => {
                handleSectionChange(2);
            }}
        >
            <hr />
            <h3>Summary</h3>
            <p>{summary}</p>
        </div>
    );
    const skillsSection = (
        <div
            className="skills-section resume-section"
            onMouseOver={sectionMouseOver}
            onMouseOut={sectionMouseOut}
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
    const experienceSection = (
        <div
            className="experience-section resume-section"
            onMouseOver={sectionMouseOver}
            onMouseOut={sectionMouseOut}
        >
            <hr />
            <h3>Experience</h3>
            {work.map((job) => (
                <div className="job-container">
                    <h3>{job.position + ", " + job.company}</h3>
                    <p>{job.startDate + " - " + job.endDate}</p>
                    <p>{job.summary}</p>
                    <ul>
                        {job.highlights.map((highlight) => (
                            <li>{highlight}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
    const educationSection = (
        <div
            className="education-section resume-section"
            onMouseOver={sectionMouseOver}
            onMouseOut={sectionMouseOut}
        >
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
                    <p>{school.startDate + " - " + school.endDate}</p>
                    <p>{"GPA: " + school.gpa}</p>
                    <p>Relevant Coursework:</p>
                    <ul>
                        {school.courses.map((course) => (
                            <li>{course}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
    const headerSection = (
        <div
            className="header-section resume-section"
            onMouseOver={sectionMouseOver}
            onMouseOut={sectionMouseOut}
            onClick={() => {
                handleSectionChange(1);
            }}
        >
            <div className="header-name">
                <h3>{name}</h3>
            </div>
            <div className="header-contact-info">
                <p>{email}</p>
                <p>{phone}</p>
                <p>{website}</p>
            </div>
        </div>
    );
    return (
        <div className="container">
            <div className="template" ref={templateRef} id="template">
                {headerSection}
                {summarySection}
                {skillsSection}
                {experienceSection}
                {educationSection}
            </div>
        </div>
    );
};

export default CleanTemplate;
