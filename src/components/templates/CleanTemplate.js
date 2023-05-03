import React, { useState, useEffect, useRef } from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/templates/CleanTemplate.css";

const CleanTemplate = ({
    resumeData,
    setResumeData,
    isPreview,
    handleSectionChange,
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

    const exportPDF = () => {
        const content = document.getElementById("clean-template");
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
            const resumeSection = e.target.closest(".clean-resume-section");
            resumeSection.style.backgroundColor = "rgba(0, 128, 128, 0.5)";
            resumeSection.style.cursor = "pointer";
            //e.target.style.backgroundColor = "red";
        }
    }

    function sectionMouseOut(e) {
        if (isPreview === false) {
            const resumeSection = e.target.closest(".clean-resume-section");
            resumeSection.style.backgroundColor = "white";
            //e.target.style.backgroundColor = "white";
        }
    }

    const contact = resumeData.contact;
    const label = resumeData.label;
    const summary = resumeData.summary;
    const work = resumeData.work;
    const education = resumeData.education;
    const skills = resumeData.skills;
    const languages = resumeData.languages;
    const interests = resumeData.interests;

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

    const exportPDFButton = (
        <button className="export-button" onClick={exportPDF}>
            Download PDF
        </button>
    );
    const summarySection = (
        <div
            className="summary-section clean-resume-section"
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
            className="skills-section clean-resume-section"
            onClick={checkoverflow}
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
        <div className="experience-section clean-resume-section">
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
        <div className="education-section clean-resume-section">
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
            className="header-section clean-resume-section"
            onClick={() => {
                handleSectionChange(1);
            }}
        >
            <div className="header-name">
                <h3>{contact.name}</h3>
            </div>
            <div className="header-contact-info">
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
                <p>{contact.website}</p>
            </div>
        </div>
    );

    const hi = <div>hi</div>;
    return (
        <div className="clean-template-container" id="clean-template-container">
            <div
                className="clean-template"
                ref={templateRef}
                id="clean-template"
            >
                <div
                    className="clean-template-content"
                    id="clean-template-content"
                >
                    {headerSection}
                    {summarySection}
                    {skillsSection}
                    {experienceSection}
                    {educationSection}
                    {educationSection}
                </div>
            </div>
        </div>
    );
};

export default CleanTemplate;
