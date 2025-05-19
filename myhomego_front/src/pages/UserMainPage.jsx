import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserMainPage.css';

export default function MemberMainPage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="main-container">
      <img
        src="/logo.png" // public 폴더에 logo.png 저장되어 있어야 함
        alt="앱 로고"
        className="logo"
      />
      <div className="button-container">
        <button className="nav-button" onClick={goToLogin}>로그인</button>
        <button className="nav-button" onClick={goToRegister}>회원가입</button>
      </div>
    </div>
  );
}
