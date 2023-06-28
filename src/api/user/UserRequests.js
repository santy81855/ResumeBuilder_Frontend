import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const getUser = () => {
    const token = localStorage.getItem("token");
    return axios.get(URL + "/users/" + token).then((res) => res.data);
};

const createUser = (data) => {
    console.log(data);
    return axios
        .post(
            URL + "/users",
            {
                first: data.first,
                last: data.last,
                username: data.username,
                email: data.email,
                password: data.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => res.data);
};

const loginSubmit = (data) => {
    console.log(data);
    return axios
        .post(
            URL + "/auth/login",
            {
                email: data.email,
                password: data.password,
            },
            {
                withCredentials: true,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => res.data);
};

const logoutUser = () => {
    return axios.get(URL + "/auth/logout").then((res) => res.data);
};

export { loginSubmit, createUser, logoutUser, getUser };
