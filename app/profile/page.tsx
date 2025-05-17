"use client";

import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import outputs from "../../amplify_outputs.json";
import ProfileForm from "@/src/components/Profile/ProfileManager";

Amplify.configure(outputs);

export default function ConnectionPage() {
    return <ProfileForm />;
}
