import axios from "axios";

const createResume = (data) => {
    console.log(data);
    const d = new Date();
    console.log("date:");
    console.log(d);
    const token = localStorage.getItem("token");
    return axios
        .post(
            "http://localhost:3000/resume/create",
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
    return axios
        .get("http://localhost:3000/resume/" + resumeId)
        .then((res) => res.data);
};

const deleteResumeById = (data) => {
    const resumeId = data.id;
    return axios
        .delete("http://localhost:3000/resume/delete/" + resumeId)
        .then((res) => res.data);
};

const updateResumeById = (data) => {
    const d = new Date();
    const resumeId = localStorage.getItem("resumeId");
    return axios
        .put("http://localhost:3000/resume/update/" + resumeId, {
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
        .get("http://localhost:3000/resume/user/all", {
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
