import React from 'react';
import logo from '../../../public/images/header_logo.png';
import styles from './Header.module.css';

function Header() {
  return (
    <header className="h-12 bg-white shadow-sm">
      <div className="flex items-center h-full px-6">
        <a href="/" className="flex items-center">
          <div className="h-10">
            <img src={logo} alt="MyHomeGo" className={styles.logoImg} />
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
