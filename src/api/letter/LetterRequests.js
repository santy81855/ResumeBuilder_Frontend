import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const createLetter = (data) => {
    const d = new Date();
    const token = localStorage.getItem("token");
    return axios
        .post(
            URL + "/letter/create",
            {
                letterTitle: data.letterTitleParam,
                jobTitle: data.jobTitleParam,
                jobDescription: data.jobDescriptionParam,
                letterDescription: data.letterDescriptionParam,
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

const getLetterById = () => {
    const letterId = localStorage.getItem("letterId");
    console.log(letterId);
    return axios.get(URL + "/letter/" + letterId).then((res) => res.data);
};

const deleteLetterById = (data) => {
    const letterId = data.id;
    return axios
        .delete(URL + "/letter/delete/" + letterId)
        .then((res) => res.data);
};

const updateLetterById = (data) => {
    const d = new Date();
    const letterId = localStorage.getItem("letterId");
    return axios
        .put(URL + "/letter/update/" + letterId, {
            letterTitle: data.letterTitleParam,
            jobTitle: data.jobTitleParam,
            jobDescription: data.jobDescriptionParam,
            letterDescription: data.letterDescriptionParam,
            lastFetched: d,
            template: data.templateParam,
            json: data.jsonParam,
        })
        .then((res) => res.data);
};

const getAllUserLetters = () => {
    const token = localStorage.getItem("token");
    return axios
        .get(URL + "/letter/user/all", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => res.data);
};

export {
    createLetter,
    getLetterById,
    deleteLetterById,
    updateLetterById,
    getAllUserLetters,
};
