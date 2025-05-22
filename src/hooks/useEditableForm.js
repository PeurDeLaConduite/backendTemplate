import { useState } from "react";

export default function useEditableForm({
    initialForm,
    items,
    setItems,
    relatedItems, // ex: posts
    setRelatedItems, // ex: setPosts
    itemKey = "id",
    relatedKey = "sectionIds",
    relationKey = "postIds",
    prepareItem = (item) => item,
}) {
    const [form, setForm] = useState(initialForm);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [backupForm, setBackupForm] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("seo.")) {
            const key = name.split(".")[1];
            setForm((prev) => ({ ...prev, seo: { ...prev.seo, [key]: value } }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handlePostsChange = (selectedIds) => {
        setForm((prev) => ({ ...prev, [relationKey]: selectedIds }));

        const updatedRelatedItems = relatedItems.map((related) => {
            if (selectedIds.includes(related.id)) {
                if (!related[relatedKey].includes(form[itemKey])) {
                    return { ...related, [relatedKey]: [...related[relatedKey], form[itemKey]] };
                }
            } else {
                return {
                    ...related,
                    [relatedKey]: related[relatedKey].filter((id) => id !== form[itemKey]),
                };
            }
            return related;
        });

        setRelatedItems(updatedRelatedItems);
    };
    const handleSectionsChange = (selectedIds) => {
        setForm((prev) => ({ ...prev, sectionIds: selectedIds }));

        const updatedRelatedItems = relatedItems.map((related) => {
            if (selectedIds.includes(related.id)) {
                if (!related[relatedKey].includes(form[itemKey])) {
                    return { ...related, [relatedKey]: [...related[relatedKey], form[itemKey]] };
                }
            } else {
                return {
                    ...related,
                    [relatedKey]: related[relatedKey].filter((id) => id !== form[itemKey]),
                };
            }
            return related;
        });

        setRelatedItems(updatedRelatedItems);
    };

    const handleSave = () => {
        const preparedForm = prepareItem(form);
        const updated = [...items];
        if (editingIndex !== null) {
            updated[editingIndex] = preparedForm;
        } else {
            updated.push(preparedForm);
        }
        setItems(updated);
        handleCancel();
    };

    const handleEdit = (index) => {
        setBackupForm(form);
        setForm(items[index]);
        setEditingIndex(index);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setForm(backupForm || initialForm);
        setEditingIndex(null);
        setIsEditing(false);
        setBackupForm(null);
    };

    const handleDelete = (index) => {
        const updated = items.filter((_, i) => i !== index);
        setItems(updated);
        if (editingIndex === index) handleCancel();
    };

    const handleReorder = (fromIndex, toPosition) => {
        const copy = [...items];
        const [moved] = copy.splice(fromIndex, 1);
        copy.splice(toPosition - 1, 0, moved);
        const updated = copy.map((item, i) => ({ ...item, order: i + 1 }));
        setItems(updated);

        if (editingIndex === fromIndex) {
            setForm((prev) => ({ ...prev, order: toPosition }));
            setEditingIndex(toPosition - 1);
        }
    };

    return {
        form,
        setForm,
        editingIndex,
        isEditing,
        handleChange,
        handleSave,
        handleEdit,
        handleCancel,
        handleDelete,
        handleReorder,
        handlePostsChange,
        handleSectionsChange,
    };
}
