import React from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/templates/CleanTemplate.css";

function CleanTemplate(props) {
    const exportPDF = () => {
        const content = document.getElementById("template");
        savePDF(content, {
            paperSize: "Letter",
            margin: 40,
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
        const section = e.target.closest(".summary-section");
        section.style.backgroundColor = "red";
        section.style.cursor = "pointer";
        //e.target.style.backgroundColor = "red";
    }

    function sectionMouseOut(e) {
        const section = e.target.closest(".summary-section");
        section.style.backgroundColor = "white";
        //e.target.style.backgroundColor = "white";
    }

    const { name, label, email, phone, website, summary, location, profiles } =
        props.resumeData.basics;
    const work = props.resumeData.work;
    const education = props.resumeData.education;
    const skills = props.resumeData.skills;
    const languages = props.resumeData.languages;
    const interests = props.resumeData.interests;

    const exportPDFButton = <button onClick={exportPDF}>Download PDF</button>;
    const summarySection = (
        <div className="summary-section section">
            <hr />
            <h3>Summary</h3>
            <p>{summary}</p>
        </div>
    );
    const skillsSection = (
        <div className="skills-section section">
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
        <div className="experience-section section">
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
        <div className="education-section section">
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
        <div>
            <div className="header-section">
                <div className="name">
                    <h3>{name}</h3>
                </div>
                <div className="contact-info">
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{website}</p>
                </div>
            </div>
        </div>
    );
    return (
        <div className="container">
            <div className="template" id="template">
                {headerSection}
                {summarySection}
                {skillsSection}
                {experienceSection}
                {educationSection}
                {exportPDFButton}
            </div>
        </div>
    );
}

export default CleanTemplate;
