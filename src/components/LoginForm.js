import React, { useState } from "react";
import "../styles/LoginForm.css";
import { store } from "../store";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("success");
                // Handle successful login
            })
            .catch((error) => {
                console.log("fail");
                // Handle login error
            });
    };

    const handleSubmit2 = (event) => {
        const user = {
            username: "example_user",
            email: "example_user@example.com",
        };
        store.login(user);
    };

    return (
        <form onSubmit={handleSubmit2}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
