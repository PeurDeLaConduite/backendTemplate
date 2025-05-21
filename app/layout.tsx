// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Header from "@/src/components/Header/Header";
import { AuthProvider } from "@/src/components/Authentication/auth-provider";
import { AuthIsConnected } from "@/src/context/AuthContext";

Amplify.configure(outputs);

export const metadata: Metadata = {
    title: { default: "Peur de la conduite", template: "%s | Peur de la conduite" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr-FR">
            <head />
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
