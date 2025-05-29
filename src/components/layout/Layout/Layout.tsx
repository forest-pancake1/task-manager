import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from './Layout.module.scss'

export const Layout = () =>{
  return(
    <div className={styles.layout}>
      <Sidebar/>
      <div className={styles.content}>
        < Header />
        <main>
          <Outlet/>
        </main>
      </div>
      
    </div>
  )
}