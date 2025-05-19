// components/buttons/Buttons.tsx
import ButtonBase from "./ButtonBase";
import { deleteButtonStyles, getEditButtonStyles } from "./buttonStyles";

import {
    Save as SaveIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    Cancel as CancelIcon,
    Add as AddIcon,
    Send as SendIcon,
    Backspace as BackspaceIcon,
    ArrowBack as ArrowBackIcon,
    PowerSettingsNew as PowerIcon,
} from "@mui/icons-material";

import type { SxProps, Theme } from "@mui/material";

type ButtonProps = {
    onClick: () => void;
    label?: string;
    className?: string;
    sx?: SxProps<Theme>;
    color?: string;
};

export function EditButton({ onClick, label, className, color }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Modifier"
            onClick={onClick}
            icon={<EditIcon fontSize="small" />}
            className={className}
            variant="outlined"
            sx={getEditButtonStyles(color)}
        />
    );
}

export function DeleteButton({ onClick, label, className }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Supprimer"
            onClick={onClick}
            icon={<DeleteIcon fontSize="small" />}
            color="error"
            className={className}
            variant="outlined"
            sx={deleteButtonStyles}
        />
    );
}

export function BackButton({ onClick, label, className }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Retour"
            onClick={onClick}
            icon={<ArrowBackIcon />}
            color="inherit"
            variant="contained"
            className={className}
        />
    );
}
export function SaveButton({ onClick, label, className }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Enregistrer"
            onClick={onClick}
            icon={<SaveIcon />}
            color="primary"
            className={className}
            variant="contained"
        />
    );
}

export function CancelButton({ onClick, label, className }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Annuler"
            onClick={onClick}
            icon={<CancelIcon />}
            color="inherit"
            className={className}
            variant="outlined"
        />
    );
}

export function AddButton({ onClick, label, className }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Ajouter"
            onClick={onClick}
            icon={<AddIcon />}
            color="success"
            className={className}
            variant="contained"
        />
    );
}

export function SubmitButton({ onClick, label, className }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Envoyer"
            onClick={onClick}
            icon={<SendIcon />}
            color="primary"
            className={className}
            variant="contained"
        />
    );
}

export function ClearFieldButton({ onClick, label, className }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Vider le champ"
            onClick={onClick}
            icon={<BackspaceIcon />}
            color="warning"
            className={className}
            variant="outlined"
        />
    );
}
export function PowerButton({ onClick, label, className }: ButtonProps) {
    return (
        <ButtonBase
            label={label}
            title="Déconnexion"
            onClick={onClick}
            icon={<PowerIcon />}
            color="error" // rouge pour indiquer la déconnexion
            className={className}
            variant="outlined"
            sx={{ ...(deleteButtonStyles || {}) }}
        />
    );
}
