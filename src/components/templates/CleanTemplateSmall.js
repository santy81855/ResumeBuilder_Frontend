import React from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/templates/CleanTemplateSmall.css";

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

    const { name, label, email, phone, website, summary, location, profiles } =
        props.resumeData.basics;
    const work = props.resumeData.work;
    const education = props.resumeData.education;
    const skills = props.resumeData.skills;
    const languages = props.resumeData.languages;
    const interests = props.resumeData.interests;

    const exportPDFButton = <button onClick={exportPDF}>Download PDF</button>;
    const summarySection = (
        <div className="summary-section-small">
            <h3>Summary</h3>
            <p>{summary}</p>
            <hr />
        </div>
    );
    const skillsSection = (
        <div className="skills-section-small">
            <h3>Skills</h3>
            <ul className="horizontal-list-small">
                {skills.map((skill) => (
                    <li>{skill.name}</li>
                ))}
            </ul>
            <hr />
        </div>
    );
    const experienceSection = (
        <div className="experience-section-small">
            <h3>Experience</h3>
            {work.map((job) => (
                <div className="job-container-small">
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
            <hr />
        </div>
    );
    const educationSection = (
        <div className="education-section-small">
            <h3>Education</h3>
            {education.map((school) => (
                <div className="school-container-small">
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
            <hr />
        </div>
    );
    const headerSection = (
        <div>
            <div className="header-section-small">
                <div className="name-small">
                    <h3>{name}</h3>
                </div>
                <div className="contact-info-small">
                    <p>{email}</p>
                    <p>{phone}</p>
                    <p>{website}</p>
                </div>
            </div>
            <hr />
        </div>
    );
    return (
        <div className="container-small">
            <div className="template-small" id="template">
                {headerSection}
                {summarySection}
                {skillsSection}
                {experienceSection}
                {educationSection}
            </div>
        </div>
    );
}

export default CleanTemplate;
