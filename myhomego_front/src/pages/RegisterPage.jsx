// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import axios from "axios";

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

  const handleRegister = async () => {
    const { id, email, password, confirmPassword, name, phone } = form;

    if (!id || !email || !password || !confirmPassword || !name || !phone) {
      setError("모든 항목을 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/user/register", {
        userId: id,
        userEmail: email,
        userPwd: password,
        userName: name,
        phone: phone,
      });

      setError("");
      alert("회원가입 성공! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {
      console.error("회원가입 실패:", err);
      setError("회원가입 실패: 이미 존재하는 아이디 또는 이메일일 수 있습니다.");
    }
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
