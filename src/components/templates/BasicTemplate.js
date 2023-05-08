import React from "react";
import { savePDF } from "@progress/kendo-react-pdf";
import "@progress/kendo-theme-default/dist/all.css";
import "../../styles/templates/BasicTemplate.css";

function BasicTemplate(props) {
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

    return (
        <div className="template" id="template">
            <div className="header">
                <h1 className="name">John Doe</h1>
                <div className="contact-info">
                    <p>1234 Main St.</p>
                    <p>Anytown, USA 12345</p>
                    <p>email@example.com</p>
                    <p>(555) 555-1234</p>
                </div>
            </div>
            <hr />
            <div className="summary">
                <h2>Summary</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Quisque bibendum tortor et sem vehicula, euismod pulvinar
                    sapien dignissim. Maecenas euismod suscipit nulla, sed
                    dignissim enim tempor ac. Aliquam sollicitudin odio id dolor
                    sagittis commodo. Sed et arcu tincidunt, vestibulum nunc
                    vel, molestie risus. Nullam sit amet risus ac odio accumsan
                    tristique. Sed vel dui bibendum, ultrices massa nec,
                    imperdiet mi. Suspendisse potenti. In euismod quam non
                    tellus hendrerit pretium. Sed sed hendrerit lacus. Sed
                    dignissim finibus ante, nec efficitur enim placerat ut.
                    Etiam interdum eros id tellus aliquam ultricies. Sed
                    tincidunt neque id orci faucibus congue. Cras consectetur
                    lorem eget augue eleifend rhoncus. Vivamus laoreet sapien
                    sit amet odio suscipit pharetra.
                </p>
            </div>
            <hr />
            <div className="skills">
                <h2>Skills</h2>
                <ul className="horizontal-list">
                    <li>JavaScript</li>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>HTML/CSS</li>
                    <li>Git</li>
                </ul>
            </div>
            <hr />
            <div className="experience">
                <h2>Experience</h2>
                <h3>Software Developer, XYZ Company</h3>
                <p>Jan 2020 - Present</p>
                <ul>
                    <li>
                        Developed and maintained web applications using React
                        and Node.js
                    </li>
                    <li>
                        Implemented new features and bug fixes based on customer
                        feedback
                    </li>
                    <li>
                        Collaborated with product managers and designers to
                        define product requirements
                    </li>
                </ul>
                <h3>Software Engineer Intern, ABC Company</h3>
                <p>May 2019 - Aug 2019</p>
                <ul>
                    <li>
                        Assisted in developing web applications using React and
                        Node.js
                    </li>
                    <li>Fixed bugs and implemented small features</li>
                    <li>
                        Learned about software development best practices and
                        agile methodologies
                    </li>
                </ul>
            </div>
            <hr />
            <div className="education">
                <h2>Education</h2>
                <h3>
                    Bachelor of Science in Computer Science, University of XYZ
                </h3>
                <p>Aug 2016 - May 2020</p>
                <ul>
                    <li>
                        Relevant coursework: Data Structures and Algorithms, Web
                        Development, Operating Systems
                    </li>
                    <li>Graduated with honors (GPA: 3.8)</li>
                </ul>
            </div>
            <hr />
            <button onClick={exportPDF}>Download PDF</button>
        </div>
    );
}

export default BasicTemplate;
