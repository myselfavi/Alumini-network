import React, { createContext, useState, useEffect, useContext } from "react";
import useApi from "../hooks/useApi";

const AuthContext = createContext({
    user: null,
    loading: true,
    login: () => {},
    logout: () => {},
    register: () => {},
});

// TODO: Maintain the same instance of the api thorugh out the whole app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const api = useApi();

    useEffect(() => {

        (async function() {
            try {
                const token = localStorage.getItem("token");
                console.log("checking user...");
                if (token) {
                    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    const res = await api.get("/api/auth/me");
                    if (res.data.user) {
                        console.log(res.data.user);
                        setUser(res.data.user);
                    }
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
                delete api.defaults.headers.common["Authorization"];

            } finally {
                setLoading(false);
            }
        })();

    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post("/api/auth/login", { email, password });
            const token = res.data.token;
            console.log(token);
            if (token) {
                localStorage.setItem("token", token);
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setUser(res.data.user);
            } else {
                throw new Error(res.data.message || 'Login failed');
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (data) => {
        try {
            const res = await api.post("/api/auth/register", data);
            const token = res.data.token;
            if (token) {
                localStorage.setItem("token", token);
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setUser(res.data.user);
            } else {
                throw new Error(res.data.message || 'Registration failed');
            }
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            setUser(null);
            localStorage.removeItem("token");
            delete api.defaults.headers.common["Authorization"];
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ login, logout, register, user }}>
            {loading && <div>Loading...</div>}
            {!loading && children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    return useContext(AuthContext);
}