/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import compasIcon from "../assets/compas.png";

const WindStatus = ({ mainData }) => {
  // intializing wind speed
  const windSpeed = mainData?.wind?.speed || 0;
  const windDeg = mainData?.wind?.deg || 0;
  // all the directions
  const getDirection = (degree) => {
    const directions = [
      "North",
      "NorthEast",
      "East",
      "SouthEast",
      "South",
      "SouthWest",
      "West",
      "NorthWest",
    ];
    const index = Math.round((degree % 360) / 45);
    return directions[index] || "North";
  };
  //getting the direction depending on the windeg
  const direction = getDirection(windDeg);
  if (!mainData) {
    return (
      <div className="w-[240px] h-[200px] bg-white rounded-2xl p-3 shadow-[0_0_8px_#64646f10] animate-pulse">
        <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
        <div className="h-[80%] flex flex-col justify-between items-start gap-4 pl-3">
          <div className="h-12 w-32 bg-gray-200 rounded mt-10"></div>
          <div className="w-full flex gap-3 items-center">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[240px] h-[200px] bg-white rounded-2xl p-3 shadow-[0_0_8px_#64646f10]">
      <span className="font-Popin text-[16px] text-[#B0B0B0]">Wind Status</span>
      <div className="h-[80%] flex flex-col justify-between items-start gap-4 pl-3">
        <h1 className="font-Popin text-5xl font-medium mt-10">
          {windSpeed.toFixed(1)}
          <span className="text-lg ml-2">Km/h</span>
        </h1>
        <div className="w-full flex gap-3 items-center">
          <img 
            src={compasIcon} 
            alt="compass" 
            className="w-[20px]"
            style={{ transform: `rotate(${windDeg}deg)` }} 
          />
          <p className="text-lg font-Popin font-medium">{direction}</p>
        </div>
      </div>
    </div>
  );
};

export default WindStatus;