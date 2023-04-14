// server address
const BASE_URL = "http://myhost.com:3000";

export const loginRequest = async (email, password) => {
    fetch(BASE_URL + "/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            // handle login response (success or fail)
            if (data.status == 200) {
                // redirect to home
                //window.location.href = data.redirect;
                // return the data
                console.log("herebuddy");
                return data;
            } else if (data.status == 401) {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
            console.log("fail");
            // Handle login error
        });
};
