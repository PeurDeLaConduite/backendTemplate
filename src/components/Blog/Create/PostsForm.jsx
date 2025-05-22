import React from "react";
import EditableField from "./components/EditableField";
import EditableTextArea from "./components/EditableTextArea";
import SeoFields from "./components/SeoFields";
import FormActionButtons from "./FormActionButtons";
import ItemSelector from "./components/ItemSelector";
import useEditableForm from "@hooks/useEditableForm";
export default function PostsForm({ posts, setPosts, sections }) {
    const initialForm = {
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

    const {
        form,
        editingIndex,
        isEditing,
        handleChange,
        handleSave,
        handleEdit,
        handleCancel,
        handleDelete,
        handleSectionsChange,
    } = useEditableForm({
        initialForm,
        items: posts,
        setItems: setPosts,
        prepareItem: (item) => ({
            ...item,
            tags: Array.isArray(item.tags)
                ? item.tags
                : item.tags.split(",").map((tag) => tag.trim()),
        }),
    });

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Articles</h2>

            <form onSubmit={(e) => e.preventDefault()} className="grid gap-2">
                <EditableField
                    name="id"
                    label="ID"
                    value={form.id}
                    onChange={handleChange}
                    readOnly={false}
                />
                <EditableField
                    name="title"
                    label="Titre"
                    value={form.title}
                    onChange={handleChange}
                    readOnly={false}
                />
                <EditableField
                    name="slug"
                    label="Slug"
                    value={form.slug}
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
                <EditableField
                    name="authorId"
                    label="Author ID"
                    value={form.authorId}
                    onChange={handleChange}
                    readOnly={false}
                />

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

                {editingIndex === null && (
                    <button
                        onClick={handleSave}
                        className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Ajouter l'article
                    </button>
                )}
            </form>

            <ul className="mt-4">
                {posts.map((post, idx) => {
                    const isEditing = editingIndex === idx;
                    return (
                        <li
                            key={post.id + "PostForm" || idx + "PostForm"}
                            className={`flex justify-between items-center p-2 transition-colors duration-300 ${
                                isEditing
                                    ? "bg-yellow-100 text-yellow-900 border-yellow-300  shadow-sm"
                                    : "border-b "
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
