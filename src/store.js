import { observable, action } from "mobx";

const store = observable({
    isLoggedIn: false,
    user: null,

    login(user) {
        this.isLoggedIn = true;
        this.user = user;
        localStorage.setItem("token", user.token);
    },

    logout() {
        this.isLoggedIn = false;
        this.user = null;
    },

    setUser(user) {
        this.user = user;
    },
});

const login = action(store.login.bind(store));
const logout = action(store.logout.bind(store));
const setUser = action(store.setUser.bind(store));

export { store, login, logout, setUser };
