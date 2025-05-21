// "use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "./../app/app.css";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Accueil | Peur de la conduite",
};

Amplify.configure(outputs);

export default function App() {
    return (
        <main>
            <h1>Bienvenue sur l&apos;application</h1>
            <div>
                🥳 App successfully hosted.
                <br />
                <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
                    Review next steps of this tutorial.
                </a>
            </div>
        </main>
    );
}
