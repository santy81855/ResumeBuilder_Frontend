import axios from "axios";

const getUser = () => {
    const token = localStorage.getItem("token");
    return axios
        .get("http://localhost:3000/users/" + token)
        .then((res) => res.data);
};

const createUser = (data) => {
    console.log(data);
    return axios
        .post(
            "http://localhost:3000/users",
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
            "http://ec2-18-116-8-136.us-east-2.compute.amazonaws.com:3000/auth/login",
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
    return axios
        .get("http://localhost:3000/auth/logout")
        .then((res) => res.data);
};

export { loginSubmit, createUser, logoutUser, getUser };
