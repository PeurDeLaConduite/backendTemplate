import React from "react";
import { EditButton, SaveButton, CancelButton } from "./index";

type ActionButtonsProps = {
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    className?: string;
};

const ActionButtons = ({
    isEditing,
    onEdit,
    onSave,
    onCancel,
    className = "",
}: ActionButtonsProps) => {
    return (
        <div className={className} style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            {!isEditing && <EditButton onClick={onEdit} label="Modifier" />}
            {isEditing && (
                <>
                    <SaveButton onClick={onSave} label="Enregistrer" />
                    <CancelButton onClick={onCancel} label="Annuler" />
                </>
            )}
        </div>
    );
};

export default ActionButtons;
