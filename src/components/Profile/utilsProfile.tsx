import type { Schema } from "@/amplify/data/resource";

export type Profile = {
    firstName: string | null;
    familyName: string | null;
    address: string | null;
    phoneNumber: string | null;
};

export const label = (field: keyof Profile): string => {
    switch (field) {
        case "firstName":
            return "Prénom";
        case "familyName":
            return "Nom";
        case "address":
            return "Adresse";
        case "phoneNumber":
            return "Téléphone";
        default:
            return field;
    }
};
type UserProfile = Schema["UserProfile"]["type"];
// ✅ Type utilisé dans les formulaires
export type MinimalProfile = Pick<
    UserProfile,
    "firstName" | "familyName" | "address" | "phoneNumber"
>;

export const normalizeFormData = (data: Partial<MinimalProfile>) => ({
    firstName: data.firstName ?? "",
    familyName: data.familyName ?? "",
    address: data.address ?? "",
    phoneNumber: data.phoneNumber ?? ""
});
