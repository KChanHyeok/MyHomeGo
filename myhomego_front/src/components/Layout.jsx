import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styles from '../style/Layout.module.css';

function Layout(props) {
  const { children } = props;
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
