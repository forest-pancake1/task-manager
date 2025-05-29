import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import type { FC } from "react";

interface LinkButtonProps{
  to: string;
  children: React.ReactNode;
}

export const LinkButton: FC<LinkButtonProps> = ({to, children}) => {
  return (
    <Button
      component={Link}
      to={to}
      fullWidth
      sx={{ textDecoration: 'none',
        variant: 'text',
        color: 'inherit',
        transition: "all 0.3s ease",
        "&:hover": {
        backgroundColor: "#caeff0"
       }
       }}
    >
      {children}
    </Button>
  );
};
{/* <LinkButton to="/tasks">
  Перейти к задачам
</LinkButton> */}