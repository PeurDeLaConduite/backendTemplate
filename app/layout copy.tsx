// app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import Header from "@/src/components/Header/Header";
import { AuthProvider } from "@/src/components/Authentication/auth-provider";
import { AuthIsConnected } from "@/src/context/AuthContext";

// Configurez Amplify ici (côté serveur c’est OK)
Amplify.configure(outputs);

// Metadata global, éventuellement fusionné avec vos pages dynamiques
export const metadata: Metadata = {
    metadataBase: new URL("https://www.peur-de-la-conduite.fr/"),
    title: {
        default: "Peur de la conduite",
        template: "%s | Peur de la conduite",
    },
    description:
        "Coaching personnalisé pour surmonter la peur de la conduite et gagner en confiance…",
    authors: [{ name: "Mounir Bouakkaz" }],
    robots: { index: true, follow: true },
    openGraph: {
        title: "Peur de la conduite",
        description: "Mounir Bouakkaz, enseignant de la conduite, vous accompagne…",
        url: "https://www.peur-de-la-conduite.fr/",
        siteName: "Peur de la conduite",
        locale: "fr_FR",
        type: "website",
        images: [
            { url: "/img/about/avatar.svg", width: 225, height: 225, alt: "Avatar" },
            {
                url: "https://www.facebook.com/.../logo.svg",
                width: 284,
                height: 267,
                alt: "Logo",
            },
        ],
    },
    icons: {
        icon: [
            { url: "/img/favicon/logo.svg", type: "image/svg+xml" },
            { url: "/img/favicon/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            // etc…
        ],
    },
    alternates: {
        canonical: "https://peur-de-la-conduite.fr/",
        media: {
            "only screen and (max-width: 900px)": "https://mobile.peur-de-la-conduite.fr/",
            "only screen and (min-width: 900px)": "https://desktop.peur-de-la-conduite.fr/",
        },
    },
    // Vous pouvez ajouter votre JSON-LD global ici si besoin
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr-FR">
            {/* Next injecte ici tous vos <meta> issus de metadata et generateMetadata */}
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
