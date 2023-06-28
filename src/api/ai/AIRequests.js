import axios from "axios";

const URL = process.env.HOST;

const sendChat = (data) => {
    console.log(data);
    return axios
        .post(
            URL + "/api/chatbot",
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

export { sendChat };
