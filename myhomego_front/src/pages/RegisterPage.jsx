// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/images/backgroundImg3.png")` }}
    >
      <div className="flex flex-col items-center justify-start min-h-screen">
        {/* 로고 */}
        <img
          src="/images/mainLogo.png"
          alt="내집GO 로고"
          className="w-1/5"
        />

        {/* 회원가입 박스 */}
        <div className="bg-white/40 backdrop-blur-md rounded-2xl shadow-2xl px-10 py-8 w-[400px] lg:w-[450px]">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">회원가입</h2>

          <div className="flex flex-col gap-3">
            <Input name="id" placeholder="아이디" onChange={handleChange} />
            <Input name="email" placeholder="이메일" onChange={handleChange} />
            <Input type="password" name="password" placeholder="비밀번호" onChange={handleChange} />
            <Input type="password" name="confirmPassword" placeholder="비밀번호 확인" onChange={handleChange} />
            <Input name="name" placeholder="이름" onChange={handleChange} />
            <Input name="phone" placeholder="전화번호" onChange={handleChange} />

            

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <Button
              onClick={handleRegister}
              className="bg-[#3097db] hover:bg-[#5cbfb7] text-white font-semibold cursor-pointer"
            >
              회원가입
            </Button>

            <Button
              disabled
              className="bg-[#FAE100] text-black font-bold hover:bg-[#f5d700] w-full cursor-not-allowed"
            >
              카카오톡으로 가입
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
