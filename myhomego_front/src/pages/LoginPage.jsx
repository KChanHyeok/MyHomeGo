// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!loginId || !password) {
      setError("아이디와 비밀번호를 모두 입력하세요.");
      return;
    }

    // Spring Boot 백엔드와 연동할 경우 여기에 fetch 또는 axios 작성 예정
    console.log("로그인 시도:", loginId, password);

    // 일단 성공했다고 가정하고 홈(/)으로 이동
    setError("");
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <input
        type="text"
        placeholder="아이디"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        className="login-input"
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />
      {error && <div className="error-message">{error}</div>}
      <button className="login-button" onClick={handleLogin}>
        로그인
      </button>
    </div>
  );
}
