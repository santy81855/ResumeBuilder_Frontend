// LoginForm.js
import React, { useState } from "react";
import "../styles/LoginForm.css";
import { login } from "../store";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                console.log(data.message);
                // handle login response (success or fail)
            })
            .catch((error) => {
                console.log(error);
                console.log("fail");
                // Handle login error
            });
    };

    const handleGoogleLogin = () => {
        // handle Google login functionality
    };

    const handleDemoLogin = () => {
        const user = {
            username: "example_user",
            email: "example_user@example.com",
        };
        login(user);
    };

    const handleCreateAccount = () => {};

    return (
        <div className="login-background">
            <div className="login-form">
                <form onSubmit={handleLoginSubmit}>
                    <h2>Login</h2>
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
                    <button className="login-btn" type="submit">
                        Login
                    </button>
                </form>
                <div className="login-options">
                    <a href="/create-account">
                        <button
                            className="create-account-btn"
                            onClick={handleCreateAccount}
                        >
                            Create an account
                        </button>
                    </a>
                    <button
                        className="google-login-btn"
                        onClick={handleGoogleLogin}
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
