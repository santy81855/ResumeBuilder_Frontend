import axios from "axios";

const sendChat = (data) => {
    console.log(data);
    return axios
        .post(
            "http://localhost:3000/api/chatbot",
            {
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful resume-building assistant.",
                    },
                    {
                        role: "user",
                        content: data.content,
                    },
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => res.data);
};

const sendSingleChat = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // messages has to be an array of objects that have a role and content and  must start with a system message
            messages: [
                {
                    role: "system",
                    content: "You are a helpful resume-building assistant.",
                },
                {
                    role: "user",
                    content: data.content,
                },
            ],
        }),
    });
    const data = await response.json();
    console.log(data);
};

export { sendChat, sendSingleChat };
