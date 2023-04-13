// LoginForm.js
import React, { useState } from "react";
import "../styles/LoginForm.css";
import { login } from "../store";
import googleLogo from "../images/googleLogo.png";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        fetch("http://myhost.com:3000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status);
                console.log(data.message);
                console.log(data.user);
                // handle login response (success or fail)
                if (data.status == 200) {
                    // successful login
                    login(data.user, data.token);
                    // clear input fields
                    setEmail("");
                    setPassword("");
                    // redirect to home
                    window.location.href = data.redirect;
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

    const handleGoogleLogin = () => {
        // handle Google login functionality
        console.log("clicked google login");
    };

    return (
        <div className="login-background">
            <div className="login-container">
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
                        <div
                            className="google-login-btn"
                            onClick={handleGoogleLogin}
                        >
                            <img
                                src={googleLogo}
                                className="google-logo"
                                alt="logo"
                            />
                            Login with Google
                        </div>
                        <div className="create-account-div">
                            <p className="make-account-message">
                                Don't have an account?
                            </p>
                            <a
                                className="create-account-btn"
                                href="/create-account"
                            >
                                (Create account)
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
