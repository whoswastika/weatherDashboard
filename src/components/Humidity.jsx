/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import thumbup from "../assets/thumbup.png";
import thumbyo from "../assets/thumbyo.png";
import thumbdown from "../assets/thumbdown.png";

const Humidity = ({ mainData }) => {
  const humidity = mainData?.main?.humidity || 0;
  const getHumidityLevel = (humid) => {
    if (humid >= 70) return { level: "High", icon: thumbdown, color: "#FF3A3A" };
    if (humid >= 60) return { level: "Fair", icon: thumbyo, color: "#FFB800" };
    if (humid >= 30) return { level: "Normal", icon: thumbup, color: "#4050D2" };
    if (humid >= 25) return { level: "Fair", icon: thumbyo, color: "#FFB800" };
    return { level: "Low", icon: thumbdown, color: "#FF3A3A" };
  };

  const { level, icon, color } = getHumidityLevel(humidity);
  if (!mainData) {
    return (
      <div className="w-[240px] h-[200px] bg-white rounded-2xl p-3 shadow-[0_0_8px_#64646f10] animate-pulse">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-[80%] flex flex-col justify-between items-start gap-4 pl-3 relative">
          <div className="h-12 w-20 bg-gray-200 rounded mt-10"></div>
          <div className="w-full flex gap-3 items-center">
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
            <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          </div>
          <div className="levelbar absolute w-8 h-[80%] bg-transparent border-2 right-2 top-4 rounded-[16px] py-1 px-[3px]">
            <div className="w-6 h-6 bg-gray-200 rounded-[50%] absolute bottom-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[150px] h-[200px] bg-white rounded-2xl p-3 shadow-[0_0_8px_#64646f10]">
      <span className="font-Popin text-[16px] text-[#B0B0B0]">Humidity</span>
      <div className="h-[80%] flex flex-col justify-between items-start gap-4 pl-3 relative">
        <h1 className="font-Popin text-5xl font-medium mt-10">
          {humidity}%
        </h1>
        <div className="w-full flex gap-3 items-center">
          <p className="text-[16px] font-Popin font-medium">{level}</p>
          <img
            src={icon}
            alt={`${level} humidity`}
            className="h-[50px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Humidity;