import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        setUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
