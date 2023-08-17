import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const getUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(URL + "/users/" + token);
    return res.data;
};

const updateUser = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
        URL + "/users/id/" + token,
        {
            data,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return res.data;
};

const createUser = async (data) => {
    const res = await axios.post(
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
    );
    return res.data;
};

const loginSubmit = async (data) => {
    const res = await axios.post(
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
    );
    return res.data;
};

const logoutUser = async () => {
    const res = await axios.get(URL + "/auth/logout");
    return res.data;
};

export { loginSubmit, createUser, logoutUser, getUser, updateUser };
