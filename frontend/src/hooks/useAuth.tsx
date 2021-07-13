import React, { ReactChildren, ReactChild, useContext, createContext } from "react";
import * as util from "../util";

interface Props {
    children: ReactChildren | ReactChild
}

const AuthContext = createContext<Partial<any>>({});

export const ProvideAuth = ({ children }: Props) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
};

const useProvideAuth = () => {
    const login = (email: string, password: string) => {
        return fetch("http://localhost:8000/api/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(err => {
                throw err;
            });
    };

    const signup = (email: string, password: string) => {

    };

    const logout = () => {
        if (util.getCookie("user_id") !== "") {
            util.deleteCookie("user_id");

            return fetch("http://localhost:8000/api/auth/logout", {
                method: "GET",
                credentials: "include",
            }).then(res => res.json())
                .then(data => {
                    return data;
                })
                .catch(err => {
                    throw err;
                });
        } else {
            throw { "not_logged_in": true };
        }
    };

    // Return the user object and auth methods
    return {
        login,
        signup,
        logout
    };
}