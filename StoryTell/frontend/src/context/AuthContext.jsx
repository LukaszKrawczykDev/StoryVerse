import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const me = await getMe();
        if (me) setUser(me);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);