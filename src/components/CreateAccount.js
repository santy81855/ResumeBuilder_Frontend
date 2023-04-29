import React, { useState } from "react";
import "../styles/CreateAccount.css";
import { login } from "../store";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createUser } from "../api/user/UserRequests";

function CreateAccount() {
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //--------------------------------------//
    const createUserQuery = useMutation({
        queryKey: ["createUser"],
        mutationFn: createUser,
        onSuccess: (data, variables, context) => {
            // successful login
            login(data.user, data.token);
            window.location.href = data.redirect;
        },
        onError: (error, variables, context) => {
            console.log("Error creating account");
            console.log(error);
            console.log(variables);
            alert(error.message);
        },
        enabled: false,
    });

    const handleCreateAccount = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            createUserQuery.mutate({
                first: first,
                last: last,
                username: username,
                email: email,
                password: password,
            });
        }
    };
    //--------------------------------------//
    /*
    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        } else {
            // Handle creating the account with the form data
            const user = {
                first,
                last,
                username,
                email,
                password,
            };
            console.log(user);
            fetch("http://myhost.com:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.status);
                    console.log(data.message);
                    // handle login response (success or fail)
                    // success creation
                    if (data.status == 201) {
                        login(data.user, data.token);
                        window.location.href = data.redirect;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    console.log("fail");
                    // Handle login error
                });
        }
    };
*/
    return (
        <div className="create-account-background">
            <div className="create-account-form">
                <form onSubmit={handleCreateAccount}>
                    <h2>Create an Account</h2>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={first}
                            onChange={(e) => setFirst(e.target.value)}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            value={last}
                            onChange={(e) => setLast(e.target.value)}
                        />
                    </label>
                    <label>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
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
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </label>
                    <button className="submit-btn" type="submit">
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateAccount;
