import React, { useState } from "react";
import "../styles/LoginForm.css";
import { login } from "../store";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        const data1 = { username: email, password: password };
        event.preventDefault();
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            /*body: JSON.stringify(data1),*/
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                // handle login response (success or fail)
                console.log(data.status);
                console.log(data.message);
            })
            .catch((error) => {
                console.log(error);
                console.log("fail");
                // Handle login error
            });
    };

    const handleSubmit2 = (event) => {
        const user = {
            username: "example_user",
            email: "example_user@example.com",
        };
        login(user);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="username"
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
