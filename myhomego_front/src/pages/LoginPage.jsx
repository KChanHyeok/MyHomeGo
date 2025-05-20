// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function LoginPage() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!loginId || !password) {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/user/login", {
        userId: loginId,
        userPwd: password,
      });

      const token = response.data;
      localStorage.setItem("accessToken", token); // 토큰 저장

      setError("");
      alert("로그인 성공");
      navigate("/main"); // UserMainPage.jsx로 연결된 페이지
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url("/images/backgroundImg3.png")` }}>
      <h2 className="text-2xl mb-6">로그인</h2>
      <Input placeholder="아이디" value={loginId} onChange={(e) => setLoginId(e.target.value)} className="w-64 mb-4" />
      <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} className="w-64 mb-4" />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <Button className="w-64" onClick={handleLogin}>로그인</Button>
    </div>
  );
}
