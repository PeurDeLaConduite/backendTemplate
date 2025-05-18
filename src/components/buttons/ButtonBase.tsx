import { Button, IconButton, ButtonProps, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type ButtonBaseProps = {
    label?: string;
    title?: string;
    onClick: () => void;
    icon?: ReactNode;
    color?: ButtonProps["color"];
    variant?: ButtonProps["variant"];
    disabled?: boolean;
    className?: string;
    sx?: SxProps<Theme>;
    size?: "small" | "medium" | "large";
};

export default function ButtonBase({
    label,
    size = "small",
    title,
    onClick,
    icon,
    color = "primary",
    variant = "contained",
    disabled = false,
    className = "",
    sx = {} // valeur par défaut
}: ButtonBaseProps) {
    if (label) {
        return (
            <Button
                onClick={onClick}
                size={size}
                color={color}
                variant={variant}
                startIcon={icon}
                disabled={disabled}
                className={`!normal-case !rounded-xl !px-4 !py-2 ${className}`}
                sx={sx} // <-- passer ici
            >
                {label}
            </Button>
        );
    }
    return (
        <IconButton
            onClick={onClick}
            size={size}
            color={color}
            title={title}
            disabled={disabled}
            className={className}
            sx={sx} // <-- passer ici
        >
            {icon}
        </IconButton>
    );
}
