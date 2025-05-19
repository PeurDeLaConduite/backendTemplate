import { useState } from "react";

export default function SectionsForm({ sections, setSections }) {
    const [form, setForm] = useState({ id: "", title: "", slug: "", description: "", order: 1 });
    const [editingIndex, setEditingIndex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingIndex !== null) {
            const updated = [...sections];
            updated[editingIndex] = form;
            setSections(updated);
        } else {
            setSections([...sections, form]);
        }
        setForm({ id: "", title: "", slug: "", description: "", order: 1 });
        setEditingIndex(null);
    };

    const handleEdit = (index) => {
        setForm(sections[index]);
        setEditingIndex(index);
    };

    const handleDelete = (index) => {
        const updated = [...sections];
        updated.splice(index, 1);
        setSections(updated);
    };

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Sections</h2>
            <form onSubmit={handleSubmit} className="grid gap-2">
                <input
                    type="text"
                    placeholder="ID"
                    value={form.id}
                    onChange={(e) => setForm({ ...form, id: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Titre"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Slug"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Ordre"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
                <button type="submit" className="bg-green-500 text-white py-1 rounded">
                    {editingIndex !== null ? "Modifier" : "Ajouter"}
                </button>
            </form>
            <ul className="mt-4">
                {sections
                    .sort((a, b) => a.order - b.order)
                    .map((section, index) => (
                        <li key={index} className="flex justify-between items-center py-1 border-b">
                            <span>
                                {section.title} (ordre: {section.order})
                            </span>
                            <div className="space-x-2">
                                <button onClick={() => handleEdit(index)} className="text-blue-500">
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="text-red-500"
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
