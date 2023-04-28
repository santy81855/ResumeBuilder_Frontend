// ResumeEditor.js
import React, { useState, useRef } from "react";
import "../styles/ResumeEditor.css";

function ResumeEditor() {
    const options = (
        <div className="options-container">
            <div className="options">1</div>
            <div className="options">2</div>
            <div className="options">3</div>
        </div>
    );
    return (
        <div className="editor-page-background">
            <div className="editor-page-vert-container">
                <div className="editor-page-hor-container">
                    <div className="resume-container">
                        <h1 className="resume-title">My Resume</h1>
                        <div className="resume-background">
                            <div className="resume"></div>
                        </div>
                    </div>
                </div>
                <div className="chatbot-container">chatbot</div>
            </div>
        </div>
    );
}
export default ResumeEditor;

// 8.5 x 11
