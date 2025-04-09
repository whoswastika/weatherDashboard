/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import excellent from "../assets/excellent.png";
import good from "../assets/good.png";
import poor from "../assets/poor.png";
import verypoor from "../assets/verypoor.png";
import dead from "../assets/dead.png";

const Visibility = ({ mainData }) => {
  //initializing visibility
  const visibility = mainData?.visibility ? mainData.visibility / 1000 : 0;
  // to get the visibility level
  const getVisibilityLevel = (vis) => {
    if (vis >= 10) return { level: "Excellent", icon: excellent, color: "#4CAF50" };
    if (vis >= 5) return { level: "Good", icon: good, color: "#8BC34A" };
    if (vis >= 2) return { level: "Moderate", icon: good, color: "#FFC107" };
    if (vis >= 1) return { level: "Poor", icon: poor, color: "#FF9800" };
    if (vis >= 0.5) return { level: "Very Poor", icon: verypoor, color: "#F44336" };
    return { level: "Fog", icon: dead, color: "#9E9E9E" };
  };

  const { level, icon, color } = getVisibilityLevel(visibility);

  if (!mainData) {
    return (
      <div className="w-[240px] h-[200px] bg-white rounded-2xl p-3 shadow-[0_0_8px_#64646f10] animate-pulse">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-[80%] flex flex-col justify-between items-start gap-4 pl-3">
          <div className="h-12 w-32 bg-gray-200 rounded mt-10"></div>
          <div className="w-full flex gap-3 items-center">
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[240px] h-[200px] bg-white rounded-2xl p-3 shadow-[0_0_8px_#64646f10]">
      <span className="font-Popin text-[16px] text-[#B0B0B0]">Visibility</span>
      <div className="h-[80%] flex flex-col justify-between items-start gap-4 pl-3">
        <h1 className="font-Popin text-5xl font-medium mt-10" style={{ color }}>
          {visibility.toFixed(1)}
          <span className="text-lg ml-2">Km</span>
        </h1>
        <div className="w-full flex gap-3 items-center">
          <p className="text-[16px] font-Popin font-medium" style={{ color }}>
            {level}
          </p>
          <img
            src={icon}
            alt={`${level} visibility`}
            className="h-[30px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Visibility;