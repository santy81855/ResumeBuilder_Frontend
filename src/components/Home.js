import React from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom"; // go to another page when you click "Create-Resume button on homepage"

function Home() {
    const navigate = useNavigate();
    const createResume2 = async (resumeData) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                "http://myhost.com:3000/resume/create",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(resumeData),
                }
            );
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const newResume = {
        resumeTitle: "First Resume",
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "555-555-5555",
        summary: "I am a software engineer with 5 years of experience.",
        experience: [
            {
                title: "Software Engineer",
                company: "Acme Corporation",
                startDate: "01/01/2018",
                endDate: "01/01/2021",
                description:
                    "Worked on the development of a web-based project management tool using React and Node.js.",
            },
        ],
        education: [
            {
                school: "University of Example",
                degree: "Bachelor of Science in Computer Science",
                graduationDate: "05/01/2017",
            },
        ],
    };

    // when they press create resume button they will be either redirected to the login page or to the first question
    const CreateResume = () => {
        const token = localStorage.getItem("token");
        if (token) {
            localStorage.removeItem("resumeId");
            navigate("/u/create-resume");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="home-container">
            <div className="background-image">
                <div className="content-container">
                    <h4>Artificial Intelligence Resume Builder</h4>
                    <h1>
                        Create your perfect resume in minutes with the help of
                        AI.
                    </h1>
                    <p>
                        Say goodbye to endless hours spent perfecting your
                        resume - with Ai Resume, our AI-powered platform makes
                        creating a professional resume fast and easy - Try it
                        now!
                    </p>
                    <button onClick={CreateResume}>Create Resume</button>
                </div>
            </div>
            <div className="horizontal-container">
                <div className="vertical-container">
                    <h2>Don't know where to start with your resume?</h2>
                    <p>
                        Let our chatbot guide you. Say goodbye to confusion and
                        frustration. Our chatbot will answer all your
                        resume-related questions. Get personalized and quick
                        responses to your resume questions..
                    </p>
                </div>
                <div className="chatbox">
                    <div className="message sent">
                        <h3>
                            Write a short and professional bio for a junior
                            software engineer.
                        </h3>
                    </div>
                    <div className="message received">
                        <h3>
                            As a junior software engineer with a strong passion
                            for technology and problem-solving, I am eager to
                            learn and grow in the field. With experience in ...{" "}
                        </h3>
                    </div>
                    <div className="message sent">
                        <h3>Can you mention my experience with JavaScript?</h3>
                    </div>
                    <div className="message received">
                        <h3>...</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
