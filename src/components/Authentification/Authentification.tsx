"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import { configureI18n, formFields } from "@/src/utils/amplifyUiConfig";

// Configuration
Amplify.configure(outputs);
configureI18n();

export default function Authentification({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Authenticator formFields={formFields}>
            {({ signOut, user }) =>
                user ? (
                    <div className="min-h-screen bg-gray-50 text-gray-900">
                        <header className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <p>
                                Connecté en tant que :{" "}
                                <strong>{user?.username}</strong>
                            </p>
                            <button
                                onClick={signOut}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                                Se déconnecter
                            </button>
                        </header>
                        <main className="p-6">{children}</main>
                    </div>
                ) : (
                    <p>Chargement...</p>
                )
            }
        </Authenticator>
    );
}
