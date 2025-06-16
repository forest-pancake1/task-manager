import styles from './Sidebar.module.scss'
import { LinkButton } from '../../UI/LinkButton';

export const Sidebar = () => {
  return(
   <div className={styles.sidebar}>
     <h1 className={styles.logo}>Task Manager</h1>
     <ul className={styles.list}>
       <LinkButton to="/home">Home</LinkButton>
       <LinkButton to="/settings">settings</LinkButton>
     </ul>
   </div>
  );
}