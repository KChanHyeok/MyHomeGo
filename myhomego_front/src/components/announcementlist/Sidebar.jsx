import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './sidebar.module.css';

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
const youthUrl = '/announcementList?search=%EC%B2%AD%EB%85%84'; // 청년
const newlywedUrl = '/announcementList?search=%EC%8B%A0%ED%98%BC'; // 신혼

const Sidebar = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search");

  const handleMenuClick = (path) => {
    window.location.href = path;
  };

  // 현재 쿼리스트링이 청년/신혼인지 체크
  const isYouth = searchQuery === "청년";
  const isNewlywed = searchQuery === "신혼";

  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>{children}</div>
      <div className={styles.contentContainer}>
        {/* 청년/신혼 버튼 가로 배치 */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', marginBottom: '1rem' }}>
          <button
            className={`${styles.navItem} ${isYouth ? styles.navItemActive : ""}`}
            onClick={() => handleMenuClick(youthUrl)}
          >
            청년
          </button>
          <button
            className={`${styles.navItem} ${isNewlywed ? styles.navItemActive : ""}`}
            onClick={() => handleMenuClick(newlywedUrl)}
          >
            신혼
          </button>
        </div>
        {/* 기존 메뉴 */}
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