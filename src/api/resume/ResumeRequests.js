import axios from "axios";

const createResume = (data) => {
    console.log(data);
    const d = new Date();
    const token = localStorage.getItem("token");
    return axios
        .post(
            "http://myhost.com:3000/resume/create",
            {
                resumeTitle: data.resumeTitleParam,
                resumeDescription: data.resumeDescriptionParam,
                lastFetched: d.toDateString(),
                json: data.jsonParam,
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        )
        .then((res) => res.data);
};

const getAllUserResumes = () => {
    const token = localStorage.getItem("token");
    return axios
        .get("http://myhost.com:3000/resume/user/all", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => res.data);
};

export { createResume, getAllUserResumes };
