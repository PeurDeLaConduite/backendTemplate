// src/components/Blog/Create/PostsForm.jsx
"use client";

import React from "react";
import EditableField from "./components/EditableField";
import EditableTextArea from "./components/EditableTextArea";
import SeoFields from "./components/SeoFields";
import FormActionButtons from "./FormActionButtons";
import ItemSelector from "./components/ItemSelector";
import useEditableForm from "@hooks/useEditableForm";
import AuthorSelector from "./components/AuthorSelector";

export default function PostsForm({ posts, setPosts, sections, setSections, authors }) {
    const initialForm = {
        id: "",
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        authorId: "",
        sectionIds: [],
        relatedPostIds: [], // ← ajouté
        videoUrl: "",
        tags: "",
        type: "tutoriel",
        status: "published",
        seo: { title: "", description: "", image: "" },
        createdAt: "",
        updatedAt: "",
    };

    const {
        form,
        editingIndex,
        isEditing,
        handleChange,
        handleSave,
        handleEdit,
        handleCancel,
        handleDelete,
        handleReorder, // si tu utilises un OrderSelector
        handleSectionsChange, // pour la liaison bidirectionnelle
    } = useEditableForm({
        initialForm,
        items: posts,
        setItems: setPosts,
        relatedItems: sections,
        setRelatedItems: setSections,
        itemKey: "id",
        relatedKey: "postIds", // dans chaque section, la clé qui liste les posts
        relationKey: "sectionIds", // dans ton form, la clé qui liste les sections
        idPrefix: "P", // génère P1, P2, P3…
        prepareItem: (item) => ({
            ...item,
            tags: Array.isArray(item.tags) ? item.tags : item.tags.split(",").map((t) => t.trim()),
        }),
    });

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Articles</h2>

            <form onSubmit={(e) => e.preventDefault()} className="grid gap-2">
                {/* ID & Slug générés automatiquement, readonly */}
                <EditableField
                    name="id"
                    label="ID"
                    value={form.id}
                    onChange={handleChange}
                    readOnly
                />
                <EditableField
                    name="slug"
                    label="Slug"
                    value={form.slug}
                    onChange={handleChange}
                    readOnly
                />
                {/* Titre -> met aussi à jour automatiquement le slug */}
                <EditableField
                    name="title"
                    label="Titre"
                    value={form.title}
                    onChange={handleChange}
                    readOnly={false}
                />
                <EditableField
                    name="excerpt"
                    label="Extrait"
                    value={form.excerpt}
                    onChange={handleChange}
                    readOnly={false}
                />
                <EditableTextArea
                    name="content"
                    label="Contenu"
                    value={form.content}
                    onChange={handleChange}
                    readOnly={false}
                />
                <AuthorSelector
                    authors={authors}
                    selectedId={form.authorId}
                    onChange={(id) => handleChange({ target: { name: "authorId", value: id } })}
                />
                {/* Sélection des sections (liaison bidirectionnelle) */}
                <ItemSelector
                    items={sections}
                    selectedIds={form.sectionIds}
                    onChange={handleSectionsChange}
                    label="Sections associées :"
                />
                <EditableField
                    name="tags"
                    label="Tags (séparés par des virgules)"
                    value={form.tags}
                    onChange={handleChange}
                    readOnly={false}
                />
                <EditableField
                    name="videoUrl"
                    label="Vidéo URL"
                    value={form.videoUrl}
                    onChange={handleChange}
                    readOnly={false}
                />
                <SeoFields seo={form.seo} readOnly={!isEditing} onChange={handleChange} />
                <input
                    type="datetime-local"
                    name="createdAt"
                    value={form.createdAt}
                    onChange={handleChange}
                />
                <input
                    type="datetime-local"
                    name="updatedAt"
                    value={form.updatedAt}
                    onChange={handleChange}
                />
                {/* Bouton Ajouter en création */}
                {editingIndex === null && (
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Ajouter l'article
                    </button>
                )}
            </form>

            <ul className="mt-6 space-y-2">
                {posts.map((post, idx) => {
                    const active = editingIndex === idx;
                    return (
                        <li
                            key={post.id}
                            className={`flex justify-between items-center p-2 transition-colors ${
                                active ? "bg-yellow-100 shadow-sm" : "border-b"
                            }`}
                        >
                            <div>
                                <strong>{post.title}</strong>
                            </div>
                            <FormActionButtons
                                editingIndex={editingIndex}
                                currentIndex={idx}
                                onEdit={() => handleEdit(idx)}
                                onSave={handleSave}
                                onCancel={handleCancel}
                                onDelete={() => handleDelete(idx)}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
