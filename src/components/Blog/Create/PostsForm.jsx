// src/components/Blog/Create/PostsForm.jsx
// "use client";

import React from "react";
import EditableField from "./components/EditableField";
import EditableTextArea from "./components/EditableTextArea";
import SeoFields from "./components/SeoFields";
import FormActionButtons from "./FormActionButtons";
import ItemSelector from "./components/ItemSelector";
import AuthorSelector from "./components/AuthorSelector";
import useEditableForm from "@hooks/useEditableForm";
import { DateTimeField } from "./components/DateTimeField";

export default function PostsForm({ posts, setPosts, sections, setSections, authors }) {
    const initialForm = {
        id: "",
        slug: "",
        title: "",
        excerpt: "",
        content: "",
        authorId: "",
        sectionIds: [],
        relatedPostIds: [],
        videoUrl: "",
        tags: "",
        type: "tutoriel",
        status: "published",
        seo: { title: "", description: "", image: "" },
        createdAt: "",
        updatedAt: "",
    };

    const { form, editingIndex, handleChange, handleSave, handleEdit, handleCancel, handleDelete } =
        useEditableForm({
            initialForm,
            items: posts,
            setItems: setPosts,
            relatedItems: sections,
            setRelatedItems: setSections,
            itemKey: "id",
            relationKey: "sectionIds",
            relatedKey: "postIds",
            idPrefix: "P",
            prepareItem: (item) => ({
                ...item,
                tags: Array.isArray(item.tags)
                    ? item.tags
                    : item.tags.split(",").map((t) => t.trim()),
            }),
        });

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Articles</h2>
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-2">
                {/* ID & Slug auto */}
                <EditableField
                    label="ID"
                    name="id"
                    value={form.id}
                    onChange={handleChange}
                    readOnly
                />
                <EditableField
                    label="Slug"
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    readOnly
                />

                {/* Titre → met à jour le slug automatiquement */}
                <EditableField
                    label="Titre"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                />
                <EditableField
                    label="Extrait"
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                />
                <EditableTextArea
                    label="Contenu"
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                />

                {/* Auteur */}
                <AuthorSelector
                    authors={authors}
                    selectedId={form.authorId}
                    onChange={(id) => handleChange({ target: { name: "authorId", value: id } })}
                />

                {/* Sections (liaison bidirectionnelle) */}
                <ItemSelector
                    items={sections}
                    selectedIds={form.sectionIds}
                    onChange={(ids) => handleChange({ target: { name: "sectionIds", value: ids } })}
                    label="Sections associées :"
                />

                <EditableField label="Tags" name="tags" value={form.tags} onChange={handleChange} />
                <EditableField
                    label="Vidéo URL"
                    name="videoUrl"
                    value={form.videoUrl}
                    onChange={handleChange}
                />

                <SeoFields seo={form.seo} readOnly={!editingIndex} onChange={handleChange} />

                {/* Dates */}
                <DateTimeField
                    label="Date de création"
                    name="createdAt"
                    value={form.createdAt}
                    onChange={handleChange}
                />
                <DateTimeField
                    label="Dernière modif"
                    name="updatedAt"
                    value={form.updatedAt}
                    onChange={handleChange}
                />

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

            <ul className="mt-4 space-y-2">
                {posts.map((post, idx) => (
                    <li
                        key={post.id}
                        className={`flex justify-between items-center p-2 ${
                            editingIndex === idx ? "bg-yellow-100 shadow-sm" : "border-b"
                        }`}
                    >
                        <strong>{post.title}</strong>
                        <FormActionButtons
                            editingIndex={editingIndex}
                            currentIndex={idx}
                            onEdit={() => handleEdit(idx)}
                            onSave={() => handleSave()}
                            onCancel={() => handleCancel()}
                            onDelete={() => handleDelete(idx)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
