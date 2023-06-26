// LoginForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { login, getLoginStatus } from "../store";
import googleLogo from "../images/googleLogo.png";
import { useQuery, useMutation } from "@tanstack/react-query";
import { loginSubmit } from "../api/user/UserRequests";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // to redirect the user to homepage if they try to go to the login route while logged in
    const navigate = useNavigate();

    //--------------------------------------//
    const loginQuery = useMutation({
        queryKey: ["loginUser"],
        mutationFn: loginSubmit,
        onSuccess: (data, variables, context) => {
            // successful login
            login(data.user, data.token);
            // clear input fields
            setEmail("");
            setPassword("");
            // redirect to home
            window.location.href = data.redirect;
        },
        onError: (error, variables, context) => {
            console.log("Error logging in");
            console.log(error);
            console.log(variables);
            alert(error.message);
        },
        enabled: false,
    });

    const handleLoginSubmit = (event) => {
        event.preventDefault();
        loginQuery.mutate({
            email: email,
            password: password,
        });
    };
    //--------------------------------------//

    const checkLoginStatus = () => {
        const isLoggedIn = getLoginStatus();
        if (isLoggedIn) {
            navigate("/");
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, [navigate]);

    const handleGoogleLogin = () => {
        // handle Google login functionality
        console.log("clicked google login");
    };

    return (
        <div className="login-background">
            <div className="login-form">
                <form onSubmit={handleLoginSubmit}>
                    <h2>Login</h2>
                    <label>
                        <p>Email:</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <p>Password:</p>
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
    );
}

export default LoginForm;
