import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './sidebar.module.css';
import { Button } from "@/components/ui/button"

const menuItems = [
  {
    label: '전체 청약 모음',
    path: '/announcementList',
  },
  {
    label: '청년 청약 모음',
    path: '/announcementList?search=청년',
  },
  {
    label: '신혼 청약 모음',
    path: '/announcementList?search=신혼',
  },
  {
    label: '챗봇',
    path: '/chatGpt',
  },
];

const Sidebar = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname + (location.search || '');

  const handleMenuClick = (path) => {
    // Remove any existing query parameters from the current path
    const currentPath = window.location.pathname;
    // If path contains query parameters, use it as is
    if (path.includes('?')) {
      window.location.href = path;
    } else {
      // If path doesn't contain query parameters, use it directly
      window.location.href = path;
    }
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
              className={`
                ${styles.navItem} ${
                  (item.path === '/announcementList?search=청년' && currentPath === '/announcementList?search=청년') ||
                  (item.path === '/announcementList?search=신혼' && currentPath === '/announcementList?search=신혼') ||
                  (item.path === '/announcementList' && currentPath === '/announcementList') ||
                  (item.path === '/chatGpt' && currentPath === '/chatGpt')
                    ? styles.navItemActive
                    : ''
                }
              `}
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