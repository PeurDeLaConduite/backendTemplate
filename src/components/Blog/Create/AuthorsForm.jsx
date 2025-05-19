import React, { useState } from "react";
import EditableField from "./components/EditableField";
import ActionButtons from "./components/buttons/ActionButtons";

export default function AuthorsForm({ authors, setAuthors }) {
    const [form, setForm] = useState({ id: "", name: "", bio: "", email: "" });
    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [backupForm, setBackupForm] = useState(null);

    const resetForm = () => {
        setForm({ id: "", name: "", bio: "", email: "" });
        setEditingIndex(null);
        setIsEditing(false);
        setBackupForm(null);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (editingIndex !== null) {
            const updated = [...authors];
            updated[editingIndex] = form;
            setAuthors(updated);
        } else {
            setAuthors([...authors, form]);
        }
        resetForm();
    };

    const handleEdit = (index) => {
        setBackupForm(form); // backup current if editing another
        setForm(authors[index]);
        setEditingIndex(index);
        setIsEditing(true);
    };

    const handleCancel = () => {
        if (editingIndex !== null) {
            resetForm();
        } else {
            setForm(backupForm || { id: "", name: "", bio: "", email: "" });
            setIsEditing(false);
        }
    };

    const handleDelete = (index) => {
        const updated = [...authors];
        updated.splice(index, 1);
        setAuthors(updated);
        if (editingIndex === index) resetForm();
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Auteurs</h2>

            <div className="grid gap-2">
                <EditableField
                    label="ID"
                    name="id"
                    value={form.id}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    label="Nom"
                    name="name"
                    value={form.name}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    label="Bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleFieldChange}
                    readOnly={!isEditing}
                />
            </div>

            <ActionButtons
                isEditing={isEditing}
                onEdit={() => {
                    setBackupForm(form);
                    setIsEditing(true);
                }}
                onSave={handleSave}
                onCancel={handleCancel}
            />

            <ul className="mt-4">
                {authors.map((author, index) => (
                    <li key={index} className="flex justify-between items-center py-1 border-b">
                        <span>{author.name}</span>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(index)}
                                className="text-blue-500 hover:underline"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="text-red-500 hover:underline"
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
