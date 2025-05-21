import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './sidebar.module.css';
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    label: '청약 모음',
    path: '/announcementList',
  },
  {
    label: '챗봇',
    path: '/chatGpt',
  },
];

const Sidebar = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleMenuClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>{children}</div>
      <div className={styles.contentContainer}>
        <nav className={styles.navMenu}>
          {menuItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              className={`${styles.navItem} ${
                item.path === '/announcementList' && currentPath.startsWith('/announcement') ? 
                  styles.navItemActive : 
                item.path === '/chatGpt' && currentPath === '/chatGpt' ? 
                  styles.navItemActive : 
                ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <Button
        className="bg-[#5DC1B7] text-black px-4 py-1 rounded cursor-pointer"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default Sidebar;