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
                // return the data
                return data;
            } else if (data.status == 401) {
                alert(data.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
