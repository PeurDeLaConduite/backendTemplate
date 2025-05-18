"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type AuthContextType = {
    isLoggedIn: boolean;
    firstName: string;
    familyName: string;
    logout: () => void;
    refreshProfile: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthIsConnected = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [familyName, setFamilyName] = useState("");

    const loadProfile = () => {
        const cookieProfile = Cookies.get("userProfile");
        if (cookieProfile) {
            try {
                const parsed = JSON.parse(cookieProfile);
                setFirstName(parsed.firstName || "");
                setFamilyName(parsed.familyName || "");
                setIsLoggedIn(true);
            } catch {
                setIsLoggedIn(false);
            }
        } else {
            setIsLoggedIn(false);
        }
    };

    const logout = () => {
        Cookies.remove("userProfile");
        setIsLoggedIn(false);
        setFirstName("");
        setFamilyName("");
    };

    useEffect(() => {
        loadProfile();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                firstName,
                familyName,
                logout,
                refreshProfile: loadProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthIsConnected");
    return context;
};
