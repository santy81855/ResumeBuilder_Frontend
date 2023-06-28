import axios from "axios";

const URL =
    process.env.NODE_ENV === "production"
        ? "http://ec2-3-135-220-37.us-east-2.compute.amazonaws.com:3000"
        : "http://localhost:3000";

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
