import React from 'react';
import logo from '../assets/myhomego_logo.png';
import styles from '../style/Header.module.css';

function Header() {
  return (
    <header className="h-16 bg-white shadow-sm">
      <div className="flex items-center h-full px-6">
        <a href="/" className="flex items-center">
          <div className="h-8 w-8">
            <img src={logo} alt="MyHomeGo" className={styles.logoImg} />
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
