import axios from "axios";

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
            "http://localhost:3000/auth/login",
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

export { loginSubmit, createUser, logoutUser };
