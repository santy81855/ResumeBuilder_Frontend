import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const getSubscription = () => {
    const token = localStorage.getItem("token");
    return axios
        .get(URL + "/stripe/get-user-subscriptions", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => res.data);
};

export { getSubscription };
