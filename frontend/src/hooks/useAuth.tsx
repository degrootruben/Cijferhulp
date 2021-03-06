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
        return fetch(util.ENDPOINT + "/auth/login", {
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

    const register = (email: string, password: string) => {
        return fetch(util.ENDPOINT + "/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(err => {
                return err;
            });
    };

    const logout = () => {
        if (util.getCookie("user_id") !== "") {
            util.deleteCookie("user_id");

            return fetch(util.ENDPOINT + "/auth/logout", {
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
            // TODO: Hier goeie error object soort throwen
            throw new Error("not_logged_in");
        }
    };

    // Return the user object and auth methods
    return {
        login,
        register,
        logout
    };
}