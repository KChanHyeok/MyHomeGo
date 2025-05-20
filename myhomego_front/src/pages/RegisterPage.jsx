// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("/images/backgroundImg3.png")` }}>
      <h2 className="text-2xl mb-6">회원가입</h2>
      <div className="flex flex-col gap-3 w-72">
        <Input name="id" placeholder="아이디" onChange={handleChange} />
        <Input name="email" placeholder="이메일" onChange={handleChange} />
        <Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
        <Input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} />
        <Input name="name" placeholder="이름" onChange={handleChange} />
        <Input name="phone" placeholder="전화번호" onChange={handleChange} />
        <Button
          disabled
          className="bg-[#FAE100] text-black font-bold hover:bg-[#f5d700] w-72"
        >
          카카오톡으로 가입
        </Button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleRegister}>회원가입</Button>
      </div>
    </div>
  );
}
