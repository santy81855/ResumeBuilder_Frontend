import axios from "axios";

const URL =
    process.env.NODE_ENV === "production"
        ? "http://ec2-18-116-8-136.us-east-2.compute.amazonaws.com:3000"
        : "http://localhost:3000";

const createResume = (data) => {
    console.log(data);
    const d = new Date();
    console.log("date:");
    console.log(d);
    const token = localStorage.getItem("token");
    return axios
        .post(
            URL + "/resume/create",
            {
                resumeTitle: data.resumeTitleParam,
                jobTitle: data.jobTitleParam,
                resumeDescription: data.resumeDescriptionParam,
                lastFetched: d,
                //lastFetched: d.toDateString(),
                template: data.templateParam,
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

const getResumeById = () => {
    const resumeId = localStorage.getItem("resumeId");
    return axios.get(URL + "/resume/" + resumeId).then((res) => res.data);
};

const deleteResumeById = (data) => {
    const resumeId = data.id;
    return axios
        .delete(URL + "/resume/delete/" + resumeId)
        .then((res) => res.data);
};

const updateResumeById = (data) => {
    const d = new Date();
    const resumeId = localStorage.getItem("resumeId");
    return axios
        .put(URL + "/resume/update/" + resumeId, {
            resumeTitle: data.resumeTitleParam,
            jobTitle: data.jobTitleParam,
            resumeDescription: data.resumeDescriptionParam,
            lastFetched: d,
            //lastFetched: d.toDateString(),
            template: data.templateParam,
            json: data.jsonParam,
        })
        .then((res) => res.data);
};

const getAllUserResumes = () => {
    const token = localStorage.getItem("token");
    return axios
        .get(URL + "/resume/user/all", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => res.data);
};

export {
    createResume,
    getAllUserResumes,
    updateResumeById,
    deleteResumeById,
    getResumeById,
};
