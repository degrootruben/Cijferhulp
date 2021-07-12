import React, { ReactChildren, ReactChild, useState, useContext, createContext } from "react";

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
    const [user, setUser] = useState(null);

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
                if (data.user_id) setUser(data.user_id);
                return data;
            })
            .catch(err => {
                throw err;
            });
    };

    const signup = (email: string, password: string) => {

    };

    const signout = () => {
        setUser(null);
    };

    // Return the user object and auth methods
    return {
        user,
        login,
        signup,
        signout
    };
}