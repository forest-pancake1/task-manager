import type { FC } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styles from './Header.module.scss'
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  }

export const Header: FC<HeaderProps> = ({title = 'Hi, you!'}) => {
  const navigate = useNavigate();
return (
 <header className={styles.header}>
  <div className={styles.logo}>
    <h1>{title}</h1>
  </div>

   <div className={styles.icon}>
    <IconButton area-label="search">
      <SearchIcon/>
    </IconButton>
    <IconButton area-label="notifications">
      <NotificationsIcon/>
    </IconButton>
    <IconButton area-label="account" onClick={() => navigate('/settings')}>
      <AccountCircleIcon/>
    </IconButton>
   </div>
 </header>
);
}