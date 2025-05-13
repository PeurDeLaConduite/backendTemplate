import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
    loginWith: {
        email: true,
    },
    userAttributes: {
        // Prénom (given_name)
        givenName: {
            mutable: true,
            required: true,
        },
        // Nom de famille (family_name)
        familyName: {
            mutable: true,
            required: true,
        },
        // Adresse
        address: {
            mutable: true,
            required: false,
        },
        // Numéro de téléphone
        phoneNumber: {
            mutable: true,
            required: false,
        },
    },
});
