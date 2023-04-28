// ResumeEditor.js
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/Editor.css";

function MyEditor() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://myhost:3000/api/chatbot", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // messages has to be an array of objects that have a role and content and  must start with a system message
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    {
                        role: "user",
                        content: "Can you write me a poem about dogs?",
                    },
                    {
                        role: "assistant",
                        content:
                            "Dogs are the ones we keep by our side, Loyal and loving, they never hide. With wagging tails and wet noses. Their love for us always discloses. From furry pup to old grey friend, Their love for us has no end. With eyes that sparkle and shine, Dogs fill our hearts with love divine. They protect us and make us feel safe, Their presence we could never replace.",
                    },
                    {
                        role: "user",
                        content:
                            "Can you write the same poem but use the name elsa for the dog?",
                    },
                ],
            }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div className="editor-page-background">
            <div className="editor-page-container">
                <div className="editor-container-container">
                    <div className="editor-container">
                        <Editor
                            tinymceScriptSrc={
                                process.env.PUBLIC_URL +
                                "/tinymce/tinymce.min.js"
                            }
                            onInit={(evt, editor) =>
                                (editorRef.current = editor)
                            }
                            initialValue="<p>This is the initial content of the editor.</p>"
                            init={{
                                height: 1000,
                                menubar: false,
                                statusbar: true,
                                elementpath: false,
                                resize: false,
                                branding: false,
                                content_css: "default",
                                plugins: [
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "preview",
                                    "help",
                                    "wordcount",
                                ],
                                toolbar:
                                    "undo redo | fontfamily fontsize | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyEditor;
