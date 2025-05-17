import React from "react";
import type { Profile } from "./utilsProfile";

type Props = {
  editModeField: { field: keyof Profile; value: string };
  setEditModeField: React.Dispatch<
    React.SetStateAction<{ field: keyof Profile; value: string } | null>
  >;
  saveSingleField: () => void;
  label: (field: keyof Profile) => string;
};

export default function EditSingleField({
  editModeField,
  setEditModeField,
  saveSingleField,
  label,
}: Props) {
  return (
    <div className="my-4 space-y-2">
      <label className="block font-medium">
        Modifier {label(editModeField.field)} :
      </label>
      <input
        className="w-full p-2 border rounded"
        value={editModeField.value}
        onChange={(e) =>
          setEditModeField((prev) =>
            prev ? { ...prev, value: e.target.value } : null
          )
        }
      />
      <div className="flex gap-2">
        <button
          onClick={saveSingleField}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Enregistrer
        </button>
        <button
          onClick={() => setEditModeField(null)}
          className="border px-3 py-1 rounded"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
