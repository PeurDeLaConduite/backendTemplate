import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
    loginWith: {
        email: true,
    },
    userAttributes: {
        givenName: {
            mutable: true,
            required: true,
        },
        familyName: {
            mutable: true,
            required: true,
        },
        address: {
            mutable: true,
            required: false,
        },
        phoneNumber: {
            mutable: true,
            required: false,
        },
        "custom:display_name": {
            dataType: "String",
            mutable: true,
            maxLen: 16,
            minLen: 1,
        },
        "custom:is_beta_user": {
            dataType: "Boolean",
            mutable: true,
        },
        "custom:started_free_trial": {
            dataType: "String", // ✔ Remplacé DateTime
            mutable: true,
        },
    },
});
