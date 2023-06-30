import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const createResume = (data) => {
    const d = new Date();
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
