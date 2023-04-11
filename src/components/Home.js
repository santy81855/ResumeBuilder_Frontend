import React from "react";
import "../styles/Home.css";

function Home() {
    const CreateResume = () => {
        console.log("create resume button pressed");
    };

    return (
        <div className="home-container">
            <div className="content-container">
                <h4>Artificial Intelligence Resume Builder</h4>
                <h1>
                    Create your perfect resume in minutes with the help of AI.
                </h1>
                <p>
                    Say goodbye to endless hours spent perfecting your resume -
                    with Ai Resume, our AI-powered platform makes creating a
                    professional resume fast and easy - Try it now!
                </p>
                <button onClick={CreateResume}>Create Resume</button>
                <div class="chatbox">
                    <div class="message sent">
                        <h3>
                            Write a bio section for someone who wants to be a
                            software engineer.
                        </h3>
                    </div>
                    <div class="message received">
                        <h3>
                            "Highly motivated and detail-oriented software
                            engineer with [number of years] years of experience
                            in [programming languages or tools]. Adept at
                            developing and implementing complex software
                            solutions to meet business requirements, with a
                            proven track record ..."
                        </h3>
                    </div>
                    <div class="message sent">
                        <h3>Can you mention my experience with JavaScript?</h3>
                    </div>
                    <div class="message received">
                        <h3>...</h3>
                    </div>
                </div>
            </div>
            <div className="background-image"></div>
        </div>
    );
}

export default Home;
