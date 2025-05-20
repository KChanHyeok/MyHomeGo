import InfoCard from "@/components/main_page/infoCard";
import React from "react";

const cardList = [
  { image: "/images/Youth.png", link: "/announcementList?search=청년" },
  { image: "/images/subscription.png", link: "/announcementList" },
  { image: "/images/newlyweds.png", link: "/announcementList?search=신혼" },
];

export default function MainPage() {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-b from-white to-blue-50 
                 bg-[url('/images/backgroundImg3.png')] bg-cover bg-center 
                 flex flex-col items-center py-12 px-4"
    >
      <img src="/images/mainLogo.png" alt="내집GO 로고" className="w-1/5" />

      <div className="text-left mb-12 leading-loose -mt-6">
        <div className="text-2xl md:text-3xl font-bold text-gray-800">
          청년과 신혼부부를 위한
        </div>
        <div className="text-2xl md:text-3xl font-bold text-gray-800">
          맞춤형 주거 정보, 한눈에 확인하세요
        </div>
      </div>

      <div className="flex flex-row justify-center items-start gap-24 w-full max-w-5x">
        {cardList.map((card, idx) => (
          <div key={idx} className={idx === 1 ? "mt-10" : ""}>
            <InfoCard key={idx} image={card.image} link={card.link} />
          </div>
        ))}
      </div>
    </div>
  );
}
