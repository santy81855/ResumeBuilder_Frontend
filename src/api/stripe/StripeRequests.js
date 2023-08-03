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
        .then((res) => {})
        .catch((e) => {
            console.error(e.error);
        });
};

const renewSubscription = (user) => {
    return axios
        .post(
            URL + "/stripe/renew-subscription",
            {
                user: user,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {})
        .catch((e) => {
            console.error(e.error);
        });
};

export { createCheckoutSession, cancelSubscription, renewSubscription };
