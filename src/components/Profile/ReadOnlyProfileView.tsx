

import type { MinimalProfile } from "./utilsProfile";

type Props = {
  profile: Partial<MinimalProfile>; // ou UserProfile si tu veux tout
  label: (field: keyof MinimalProfile) => string;
  onEditField: (edit: { field: keyof MinimalProfile; value: string }) => void;
  onClearField: (field: keyof MinimalProfile) => void;
};



export default function ReadOnlyProfileView({
    profile,
    onEditField,
    onClearField,
    label
}: Props) {
    const fields = [
        "firstName",
        "familyName",
        "address",
        "phoneNumber"
    ] as const;

    return (
        <>
            {fields.map(field => (
                <div key={field} className="flex items-center gap-2">
                    <p className="flex-1">
                        <strong>{label(field)} :</strong>{" "}
                        {profile[field] || "—"}
                    </p>
                    <button
                        onClick={() =>
                            onEditField({ field, value: profile[field] || "" })
                        }
                        className="text-blue-600 text-sm"
                    >
                        ✏️
                    </button>
                    {profile[field] && (
                        <button
                            onClick={() => onClearField(field)}
                            className="text-red-600 text-sm"
                        >
                            ❌
                        </button>
                    )}
                </div>
            ))}
        </>
    );
}
