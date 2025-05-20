import React from "react";
import styles from '../style/sidebar.module.css';

const menuItems = [
  {
    label: 'Home',
    path: '/',
  },
  {
    label: '청약 모음',
    path: '/announcements',
  },
  {
    label: '챗봇',
    path: '/chatbot',
  },
];

const Sidebar = () => {
  const [activePath, setActivePath] = React.useState('/');

  const handleMenuClick = (path) => {
    setActivePath(path);
    // 페이지 이동 로직 추가
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.contentContainer}>
        <nav className={styles.navMenu}>
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              className={`${styles.navItem} ${activePath === item.path ? styles.navItemActive : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <button
        className={styles.logoutButton}
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Sidebar;