"use client";

// import "./app.css";

import { Amplify } from "aws-amplify";
// import "@aws-amplify/ui-react/styles.css";
import outputs from "../amplify_outputs.json";
import Header from "@/src/components/Header/Header";
Amplify.configure(outputs);
import "./globals.css";

import { AuthProvider } from "@/src/components/Authentication/auth-provider";
import { AuthIsConnected } from "@/src/context/AuthContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <AuthIsConnected>
                    <Header />
                    <AuthProvider>
                        <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-8 sm:py-10">
                            {children}
                        </main>
                    </AuthProvider>
                </AuthIsConnected>
            </body>
        </html>
    );
}
