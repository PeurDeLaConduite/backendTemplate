"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/src/context/AuthContext";
import { PowerButton } from "../buttons/Buttons";

const Header = () => {
    const { isLoggedIn, firstName, familyName, logout } = useAuth();

    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-6xl mx-auto flex items-center justify-between p-4">
                <div className="flex gap-6">
                    <Link href="/" className="text-gray-700 hover:text-blue-600">
                        Home
                    </Link>
                    <Link href="/uploadPage" className="text-gray-700 hover:text-blue-600">
                        Upload Page
                    </Link>
                    <Link href="/profile" className="text-gray-700 hover:text-blue-600">
                        My profile
                    </Link>
                    <Link href="/blog" className="text-gray-700 hover:text-blue-600">
                        Blog
                    </Link>
                    <Link
                        href="/informations-legales"
                        className="text-gray-700 hover:text-blue-600"
                    >
                        Informations légales
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            <p className="text-sm text-gray-700">
                                Connecté en tant que :{" "}
                                <strong>
                                    {firstName} {familyName}
                                </strong>
                            </p>
                            <PowerButton
                                onClick={logout}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                                Se déconnecter
                            </PowerButton>
                        </>
                    ) : (
                        <Link href="/connection" className="text-gray-700 hover:text-blue-600">
                            Connection
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
