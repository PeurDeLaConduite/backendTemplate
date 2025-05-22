import ActionButtons from "./components/buttons/ActionButtons";
import { EditButton, DeleteButton } from "@/src/components/buttons";

export default function FormActionButtons({
    editingIndex,
    currentIndex,
    onEdit,
    onSave,
    onCancel,
    onDelete,
    isFormNew,
    addButtonLabel = "Ajouter",
    className = "",
}) {
    if (isFormNew && editingIndex === null) {
        return (
            <button
                type="button"
                onClick={onSave}
                className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            >
                {addButtonLabel}
            </button>
        );
    }

    if (editingIndex === currentIndex) {
        return (
            <ActionButtons
                isEditing={true}
                onEdit={onEdit}
                onSave={onSave}
                onCancel={onCancel}
                className={className}
            />
        );
    }

    return (
        <div className="flex gap-2 ">
            <EditButton onClick={onEdit} className="!p-2 !h-8" color="#1976d2" label="Modifier" />
            <DeleteButton onClick={onDelete} className="!p-2 !h-8" label="Supprimer" />
        </div>
    );
}
