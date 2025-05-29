import { Button } from "@mui/material";
import { type FC } from "react";

// Никаких сложных расширений типов
type ButtonVariant = 'text' | 'outlined' | 'contained';
type ButtonColor = 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

interface MuiButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: 'small' | 'medium' | 'large';
  color?: ButtonColor;
  onClick?: () => void;
}

export const MuiButton: FC<MuiButtonProps> = ({ 
  children,
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  onClick,
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      color={color}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
// // Для действий
// <MuiButton 
//   variant="contained"
//   onClick={handleSave}
// >
//   Сохранить
// </MuiButton>