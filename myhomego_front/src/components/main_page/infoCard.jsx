import React from "react";

export default function InfoCard({ title, description, image }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl 
                 hover:-translate-y-1 transition-all duration-300 
                 p-6 flex flex-col items-center text-center w-72 h-72"
    >
      <img src={image} alt={title} className="w-20 h-20 object-contain mb-4" />
      <h2 className="text-lg font-semibold text-blue-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
