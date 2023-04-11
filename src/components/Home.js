import React from "react";
import "../styles/Home.css";

function Home() {
    const CreateResume = () => {
        console.log("create resume button pressed");
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
                    <h4>
                        Chat with the AI assistant for expert resume
                        recommendations
                    </h4>
                    <div className="chatbox">
                        <div className="message sent">
                            <h3>
                                Write a short and professional bio for a junior
                                software engineer.
                            </h3>
                        </div>
                        <div className="message received">
                            <h3>
                                As a junior software engineer with a strong
                                passion for technology and problem-solving, I am
                                eager to learn and grow in the field. With
                                experience in ...{" "}
                            </h3>
                        </div>
                        <div className="message sent">
                            <h3>
                                Can you mention my experience with JavaScript?
                            </h3>
                        </div>
                        <div className="message received">
                            <h3>...</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
