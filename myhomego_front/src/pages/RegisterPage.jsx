// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const { id, email, password, confirmPassword, name, phone } = form;

    if (!id || !email || !password || !confirmPassword || !name || !phone) {
      setError("모든 항목을 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 여기에 실제 회원가입 API 요청 추가 예정
    console.log("회원가입 데이터:", form);

    setError("");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h2>회원가입</h2>
      <input name="id" placeholder="아이디" onChange={handleChange} className="register-input" />
      <input name="email" placeholder="이메일" onChange={handleChange} className="register-input" />
      <input type="password" name="password" placeholder="비밀번호" onChange={handleChange} className="register-input" />
      <input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} className="register-input" />
      <input name="name" placeholder="이름" onChange={handleChange} className="register-input" />
      <input name="phone" placeholder="전화번호" onChange={handleChange} className="register-input" />
      
      {/* 소셜 로그인 버튼 (디자인만) */}
      <button className="social-button">카카오톡으로 가입</button>

      {error && <div className="error-message">{error}</div>}

      <button className="register-button" onClick={handleRegister}>
        회원가입
      </button>
    </div>
  );
}
