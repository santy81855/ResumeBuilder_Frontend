import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const createCheckoutSession = (user) => {
    return axios
        .post(
            URL + "/stripe/create-checkout-session",
            {
                user: user,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            console.log(res.data.url);
            window.location = res.data.url;
        })
        .catch((e) => {
            console.error(e.error);
        });
};

const cancelSubscription = (user) => {
    return axios
        .post(
            URL + "/stripe/cancel-subscription",
            {
                user: user,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            console.log(res.data);
        })
        .catch((e) => {
            console.error(e.error);
        });
};

export { createCheckoutSession, cancelSubscription };
