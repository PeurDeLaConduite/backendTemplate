import React, { useState } from "react";
import EditableField from "./components/EditableField";
import EditableTextArea from "./components/EditableTextArea";
import ActionButtons from "./components/buttons/ActionButtons";

export default function PostsForm({ posts, setPosts, sections }) {
    const emptyForm = {
        id: "",
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        authorId: "",
        sectionIds: [],
        videoUrl: "",
        tags: "",
        type: "tutoriel",
        status: "published",
        seo: { title: "", description: "", image: "" },
        createdAt: "",
        updatedAt: "",
    };

    const [form, setForm] = useState(emptyForm);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [backupForm, setBackupForm] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("seo.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({
                ...prev,
                seo: {
                    ...prev.seo,
                    [key]: value,
                },
            }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = () => {
        const postToAdd = {
            ...form,
            tags: form.tags.split(",").map((tag) => tag.trim()),
        };

        if (editingIndex !== null) {
            const updated = [...posts];
            updated[editingIndex] = postToAdd;
            setPosts(updated);
        } else {
            setPosts([...posts, postToAdd]);
        }

        setForm(emptyForm);
        setEditingIndex(null);
        setIsEditing(false);
        setBackupForm(null);
    };

    const handleEdit = (index) => {
        const post = posts[index];
        setForm({ ...post, tags: post.tags.join(", ") });
        setBackupForm({ ...post, tags: post.tags.join(", ") });
        setEditingIndex(index);
        setIsEditing(true);
    };

    const handleDelete = (index) => {
        const updated = [...posts];
        updated.splice(index, 1);
        setPosts(updated);
    };

    const handleCancel = () => {
        setForm(backupForm || emptyForm);
        setEditingIndex(null);
        setIsEditing(false);
        setBackupForm(null);
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Articles</h2>
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-2">
                <EditableField
                    name="id"
                    label="ID"
                    value={form.id}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    name="title"
                    label="Titre"
                    value={form.title}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    name="slug"
                    label="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    name="excerpt"
                    label="Extrait"
                    value={form.excerpt}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableTextArea
                    name="content"
                    label="Contenu"
                    value={form.content}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    name="authorId"
                    label="Author ID"
                    value={form.authorId}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <label>Sélectionner les sections</label>
                <select
                    multiple
                    disabled={!isEditing}
                    value={form.sectionIds}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            sectionIds: Array.from(e.target.selectedOptions, (o) => o.value),
                        })
                    }
                >
                    {sections.map((s) => (
                        <option key={s.id} value={s.id}>
                            {s.title}
                        </option>
                    ))}
                </select>
                <EditableField
                    name="tags"
                    label="Tags (séparés par des virgules)"
                    value={form.tags}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    name="videoUrl"
                    label="Vidéo URL"
                    value={form.videoUrl}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    name="seo.title"
                    label="SEO Titre"
                    value={form.seo.title}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    name="seo.description"
                    label="SEO Description"
                    value={form.seo.description}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <EditableField
                    name="seo.image"
                    label="SEO Image URL"
                    value={form.seo.image}
                    onChange={handleChange}
                    readOnly={!isEditing}
                />
                <input
                    type="datetime-local"
                    name="createdAt"
                    value={form.createdAt}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
                <input
                    type="datetime-local"
                    name="updatedAt"
                    value={form.updatedAt}
                    onChange={handleChange}
                    disabled={!isEditing}
                />

                <ActionButtons
                    isEditing={isEditing}
                    onEdit={() => {
                        setBackupForm(form);
                        setIsEditing(true);
                    }}
                    onSave={handleSubmit}
                    onCancel={handleCancel}
                />
            </form>

            <ul className="mt-4">
                {posts.map((post, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-1">
                        <span>{post.title}</span>
                        <div className="space-x-2">
                            <button onClick={() => handleEdit(index)} className="text-blue-500">
                                Modifier
                            </button>
                            <button onClick={() => handleDelete(index)} className="text-red-500">
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
