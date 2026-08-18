import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        const adminData = localStorage.getItem("admin");

        if (token && adminData) {
            setAdmin(JSON.parse(adminData));
        }

        setLoading(false);
    }, []);

    const login = (token, adminData) => {
        localStorage.setItem("admin_token", token);
        localStorage.setItem(
            "admin",
            JSON.stringify(adminData)
        );

        setAdmin(adminData);
    };

    const logout = () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin");

        setAdmin(null);
    };

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
                login,
                logout,
                isAuthenticated: !!admin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
