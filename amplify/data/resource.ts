import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    UserProfile: a
      .model({
        firstName: a.string(),
        familyName: a.string(),
        address: a.string(),
        phoneNumber: a.string(),
      })
      .authorization((allow) => [allow.owner()]),
  });
  

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "userPool",
    },
});
