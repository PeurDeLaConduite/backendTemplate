"use client";

import "./app.css";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import Authentification from "@/src/components/Authentification/Authentification";

Amplify.configure(outputs);

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr">
            <body>
                <Authentification>
                    <main>{children}</main>
                </Authentification>
            </body>
        </html>
    );
}
