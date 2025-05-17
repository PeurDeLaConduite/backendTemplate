"use client";

import { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json"; 
import "@aws-amplify/ui-react/styles.css";
import EditSingleField from "./EditSingleField";
import ReadOnlyProfileView from "./ReadOnlyProfileView";
import ProfileForm from "./ProfileForm";
import { label as fieldLabel } from "./utilsProfile";
Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function ProfileManager() {
  const { user } = useAuthenticator();

  const [profile, setProfile] = useState<Schema["UserProfile"]["type"] | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    familyName: "",
    address: "",
    phoneNumber: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [editModeField, setEditModeField] = useState<{
    field: keyof typeof formData;
    value: string;
  } | null>(null);

  // 🔁 Sync du profil temps-réel
  useEffect(() => {
    if (!user) return;

    const sub = client.models.UserProfile.observeQuery().subscribe({
      next: ({ items }) => {
        const item = items[0] ?? null;
        setProfile(item);
        if (item && !editMode) {
          setFormData({
            firstName: item.firstName ?? "",
            familyName: item.familyName ?? "",
            address: item.address ?? "",
            phoneNumber: item.phoneNumber ?? "",
          });
        }
      },
    });

    return () => sub.unsubscribe();
  }, [user, editMode]);

  // 🔧 Gestion des champs de formulaire
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((f) => ({ ...f, [name]: value }));

  // 💾 Enregistrer (création ou édition globale)
  const saveProfile = async () => {
    try {
      if (profile) {
        await client.models.UserProfile.update({ id: profile.id, ...formData });
        alert("Profil mis à jour ✔");
      } else {
        await client.models.UserProfile.create({ ...formData });
        alert("Profil créé ✔");
      }
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde");
    }
  };

  // 💾 Mise à jour d’un champ unique
  const saveSingleField = async () => {
    if (!profile || !editModeField) return;
    const { field, value } = editModeField;
    try {
      await client.models.UserProfile.update({
        id: profile.id,
        [field]: value,
      });
      setEditModeField(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour");
    }
  };

  // ❌ Vider un champ
  const clearField = async (field: keyof typeof formData) => {
    if (!profile) return;
    if (!confirm(`Supprimer le contenu du champ "${label(field)}" ?`)) return;
    try {
      await client.models.UserProfile.update({
        id: profile.id,
        [field]: "",
      });
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du champ");
    }
  };

  // 🗑️ Supprimer le profil
  const deleteProfile = async () => {
    if (!profile) return;
    if (!confirm("Supprimer définitivement votre profil ?")) return;
    try {
      await client.models.UserProfile.delete({ id: profile.id });
      alert("Profil supprimé ✔");
      setFormData({ firstName: "", familyName: "", address: "", phoneNumber: "" });
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  };

  // 🔤 Label de champ (français)
  const label = (field: string) => {
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

  // 👤 Utilisateur non connecté
  if (!user) return null;

  return (
    <section className="max-w-md mx-auto p-4 border rounded mb-6">
      <h2 className="text-lg font-semibold mb-2">Mon profil</h2>

      {/* 👁️ Lecture seule */}
      {!editMode && profile && !editModeField && (
        <ReadOnlyProfileView
          profile={profile}
          onEditField={setEditModeField}
          onClearField={clearField}
          label={fieldLabel}
        />
      )}

      {/* 📝 Édition d’un champ unique */}
      {editModeField && (
        <EditSingleField
        editModeField={editModeField}
        setEditModeField={setEditModeField}
        saveSingleField={saveSingleField}
        label={fieldLabel}
       />
      )}

      {/* 🆕 Création ou édition complète */}
      {(editMode || !profile) && !editModeField && (
            <ProfileForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={saveProfile}
            isEdit={!!profile}
            onCancel={() => {
                setEditMode(false);
                setFormData({
                firstName: profile?.firstName ?? "",
                familyName: profile?.familyName ?? "",
                address: profile?.address ?? "",
                phoneNumber: profile?.phoneNumber ?? "",
                });
            }}
            />
        )}


      {/* ❌ Supprimer le profil */}
      {profile && !editMode && !editModeField && (
        <button
          onClick={deleteProfile}
          className="mt-4 text-red-600 text-sm underline"
        >
          Supprimer mon profil
        </button>
      )}
    </section>
  );
}
