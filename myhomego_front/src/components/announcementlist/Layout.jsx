import React from 'react';
import Header from './Header';
import AnnouncementSidebar from './Sidebar';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        <AnnouncementSidebar />
        <div className={styles.content}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
