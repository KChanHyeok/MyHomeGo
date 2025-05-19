import InfoCard from "@/components/main_page/infoCard";
import React from "react";

const cardList = [
  {
    title: "청년 주거지원",
    description: "청년을 위한 전세/월세 지원제도 안내",
    image: "",
  },
  {
    title: "청약 정보",
    description: "공공/민영 청약과 행복주택 정보를 한눈에",
    image: "",
  },
  {
    title: "신혼부부 주거지원",
    description: "신혼희망타운과 전세자금지원 정보 제공",
    image: "",
  },
];

export default function MainPage() {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-white to-blue-50 
                 bg-[url('/images/backgroundImg3.png')] bg-cover bg-center 
                 flex flex-col items-center py-12 px-4"
    >
      <img src="/images/mainLogo.png" alt="내집GO 로고" className="w-40 mb-6" />

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12 leading-relaxed">
        청년과 신혼부부를 위한 <br className="md:hidden" />
        맞춤형 주거 정보, 한눈에 확인하세요
      </h1>

      <div className="flex flex-row justify-center items-start gap-6 w-full max-w-5xl">
        {cardList.map((card, idx) => (
          <InfoCard
            key={idx}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
}
