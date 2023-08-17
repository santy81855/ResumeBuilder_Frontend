import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./api/user/UserRequests";

const AppStateContext = createContext();

export const useAppState = () => {
    return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }) => {
    const [appState, setAppState] = useState({
        language: "English",
    });
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserQuery.refetch();
        }
    }, []);
    const getUserQuery = useQuery({
        queryKey: ["getUserByToken"],
        queryFn: getUser,
        onSuccess: (data, variables, context) => {
            setAppState({ ...appState, language: data.user.language });
        },
        onError: (error, variables, context) => {
            alert("Error getting user information.");
        },
        enabled: false,
    });

    return (
        <AppStateContext.Provider value={{ appState, setAppState }}>
            {children}
        </AppStateContext.Provider>
    );
};
