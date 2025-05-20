import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserMainPage.css';
import { Button } from "@/components/ui/button";

export default function MemberMainPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/images/backgroundImg3.png')` }}>
      <img src="/images/mainLogo.png" alt="앱 로고" className="w-48 mb-10" />
      <div className="flex flex-col gap-4">
        <Button className="w-48" onClick={() => navigate("/login")}>로그인</Button>
        <Button className="w-48" onClick={() => navigate("/register")}>회원가입</Button>
      </div>
    </div>
  );
}
