// SectionsForm.jsx
import EditableField from "./components/EditableField";
import SeoFields from "./components/SeoFields";
import FormActionButtons from "./FormActionButtons";
import useEditableForm from "@hooks/useEditableForm";
import OrderSelector from "./components/OrderSelector";
import ItemSelector from "./components/ItemSelector";

export default function SectionsForm({ sections, setSections, posts, setPosts }) {
    const initialForm = {
        id: "",
        title: "",
        slug: "",
        description: "",
        order: 1,
        postIds: [],
        seo: { title: "", description: "", image: "" },
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
        handleReorder,
        setForm,
        handlePostsChange,
    } = useEditableForm({
        initialForm,
        items: sections,
        setItems: setSections,
        relatedItems: posts,
        setRelatedItems: setPosts,
        itemKey: "id",
        relatedKey: "sectionIds",
        relationKey: "postIds",
        prepareItem: (item) => ({
            ...item,
            postIds: Array.isArray(item.postIds)
                ? item.postIds
                : item.postIds.split(",").map(Number),
            order: Number(item.order),
        }),
    });

    // const handlePostIdsChange = (newPostIds) => {
    //     setForm((prev) => ({ ...prev, postIds: newPostIds }));

    //     // Mettre à jour les articles (liaison bidirectionnelle)
    //     const updatedPosts = posts.map((post) => {
    //         if (newPostIds.includes(post.id)) {
    //             if (!post.sectionIds.includes(form.id)) {
    //                 return { ...post, sectionIds: [...post.sectionIds, form.id] };
    //             }
    //         } else {
    //             return { ...post, sectionIds: post.sectionIds.filter((id) => id !== form.id) };
    //         }
    //         return post;
    //     });
    //     setPosts(updatedPosts);
    // };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Sections</h2>
            <form onSubmit={(e) => e.preventDefault()} className="grid gap-2">
                <EditableField name="id" label="ID" value={form.id} onChange={handleChange} />
                <EditableField
                    name="title"
                    label="Titre"
                    value={form.title}
                    onChange={handleChange}
                />
                <EditableField name="slug" label="Slug" value={form.slug} onChange={handleChange} />
                <EditableField
                    name="description"
                    label="Description"
                    value={form.description}
                    onChange={handleChange}
                />
                <OrderSelector
                    sections={sections}
                    currentIndex={editingIndex === null ? sections.length : editingIndex}
                    value={form.order}
                    onReorder={handleReorder}
                />
                <SeoFields seo={form.seo} readOnly={!isEditing} onChange={handleChange} />

                {/* <PostSelector
                    posts={posts || []}
                    selectedPostIds={form.postIds}
                    onChange={handlePostsChange}
                /> */}
                <ItemSelector
                    items={posts || []}
                    selectedIds={form.postIds}
                    onChange={handlePostsChange}
                    label="Articles associés :"
                />
                {editingIndex === null && (
                    <button
                        type="button"
                        onClick={handleSave}
                        className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        Ajouter la section
                    </button>
                )}
            </form>

            <ul className="mt-6 space-y-2">
                {sections
                    .sort((a, b) => a.order - b.order)
                    .map((section, idx) => {
                        const isEditing = editingIndex === idx;
                        return (
                            <li
                                key={section.id || idx}
                                className={`flex justify-between items-center p-2 transition-colors duration-300 ${
                                    isEditing ? "bg-yellow-100" : "border-b"
                                }`}
                            >
                                <div>
                                    <strong>{section.title}</strong> (ordre : {section.order})
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
