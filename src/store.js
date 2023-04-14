import { observable, action } from "mobx";

const store = observable({
    isLoggedIn: false,
    user: null,

    initialize() {
        const token = localStorage.getItem("token");
        console.log(token);
        console.log("user: " + this.user);
        if (token && !this.user) {
            this.isLoggedIn = true;
            // fetch user information using token and set it to user
            fetch("http://myhost.com:3000/users/get-user/", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    // The user is indeed logged in
                    if (data.status === 200) {
                        this.setUser(data.user);
                        console.log(data.user);
                    } else {
                        console.log("hey");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    },

    // return whether the user is logged in or not
    getLoginStatus() {
        const token = localStorage.getItem("token");
        return token ? true : false;
    },

    login(user, token) {
        this.isLoggedIn = true;
        this.user = user;
        localStorage.setItem("token", token);
    },

    logout() {
        this.isLoggedIn = false;
        this.user = null;
        localStorage.removeItem("token");
    },

    setUser(user, token) {
        this.login(user, token);
    },
});

const initialize = action(store.initialize.bind(store));
const getLoginStatus = action(store.getLoginStatus.bind(store));
const login = action(store.login.bind(store));
const logout = action(store.logout.bind(store));
const setUser = action(store.setUser.bind(store));

export { store, initialize, login, logout, setUser, getLoginStatus };
