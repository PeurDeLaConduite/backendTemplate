"use client";

import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import { configureI18n, formFields } from "@/src/utils/amplifyUiConfig";
import UserProfileGuard from "./UserProfileGuard"; // ✅ Sous-composant de protection

// Configure AWS Amplify et i18n
Amplify.configure(outputs);
configureI18n();

export default function Authentication({ children }: { children: React.ReactNode }) {
    return (
        <Authenticator formFields={formFields}>
            {({ signOut, user }) =>
                user ? (
                    <UserProfileGuard signOut={() => signOut?.()}>{children}</UserProfileGuard>
                ) : (
                    <p>Chargement...</p>
                )
            }
        </Authenticator>
    );
}
