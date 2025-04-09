/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";

import a01d from "../assets/MainWeatherIcons/a01d.png";
import a01n from "../assets/MainWeatherIcons/a01n.png";
import c01d from "../assets/MainWeatherIcons/c01d.png";
import c01n from "../assets/MainWeatherIcons/c01n.png";
import c02d from "../assets/MainWeatherIcons/c02d.png";
import c02n from "../assets/MainWeatherIcons/c02n.png";
import c03d from "../assets/MainWeatherIcons/c03d.png";
import c03n from "../assets/MainWeatherIcons/c03n.png";
import c04d from "../assets/MainWeatherIcons/c04d.png";
import c04n from "../assets/MainWeatherIcons/c04n.png";
import r01d from "../assets/MainWeatherIcons/r01d.png";
import r01n from "../assets/MainWeatherIcons/r01n.png";
import r05d from "../assets/MainWeatherIcons/r05d.png";
import r05n from "../assets/MainWeatherIcons/r05n.png";
import s01d from "../assets/MainWeatherIcons/s01d.png";
import s01n from "../assets/MainWeatherIcons/s01n.png";
import t01d from "../assets/MainWeatherIcons/t01d.png";
import t01n from "../assets/MainWeatherIcons/t01n.png";
import u00d from "../assets/MainWeatherIcons/u00d.png";

const Primarydata = ({ mainData, clickName }) => {
  const [currentday, setCurrentDay] = useState("");
  const [currenttime, setCurrentTime] = useState("");
  const [tempF, setTempF] = useState("");
  const [mainWIcon, setMainWIcon] = useState(null);

  const getDayTime = () => {
    if (!mainData?.dt) return;
    
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const date = new Date(mainData.dt * 1000);
    const day = weekday[date.getDay()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    setCurrentDay(day);
    setCurrentTime(time);
  };

  const TempCelcToFahren = () => {
    if (!mainData?.main?.temp) return;
    const fahren = ((mainData.main.temp - 273.15) * 9/5 + 32).toFixed(1);
    setTempF(fahren);
  };

  useEffect(() => {
    if (!mainData) return;
    
    getDayTime();
    TempCelcToFahren();

    const weatherIconCode = mainData.weather?.[0]?.icon;
    if (!weatherIconCode) {
      setMainWIcon(u00d);
      return;
    }

    const WIcons = {
      '01d': c01d,
      '01n': c01n,
      '02d': c02d,
      '02n': c02n,
      '03d': c03d,
      '03n': c03n,
      '04d': c04d,
      '04n': c04n,
      '09d': r05d,
      '09n': r05n,
      '10d': r01d,
      '10n': r01n,
      '11d': t01d,
      '11n': t01n,
      '13d': s01d,
      '13n': s01n,
      '50d': a01d,
      '50n': a01n,
    };

    setMainWIcon(WIcons[weatherIconCode] || u00d);
  }, [mainData, clickName]);
  if (!mainData || !mainData.main) {
    return (
      <div className="w-[80%] lg:w-[80%] sm:w-[90%] py-2 lg:py-2 xs:py-2 sm:py-4 sm:p-0 flex flex-col lg:flex-col sm:flex-row xs:flex-col items-start lg:items-start xs:items-start sm:items-center justify-between gap-3 mt-3">
        <div className="animate-pulse bg-gray-200 w-40 h-40 rounded"></div>
        <div className="animate-pulse bg-gray-200 w-40 h-20 rounded"></div>
        <div className="animate-pulse bg-gray-200 w-40 h-10 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-[80%] lg:w-[80%] sm:w-[90%] py-2 lg:py-2 xs:py-2 sm:py-4 sm:p-0 flex flex-col lg:flex-col sm:flex-row xs:flex-col items-start lg:items-start xs:items-start sm:items-center justify-between gap-3 mt-3">
      <img
        src={mainWIcon || u00d}
        alt="weather icon"
        className="max-h-40 object-cover"
      />
      <h1 className="text-6xl lg:text-6xl font-[500] font-Popin mt-4 md:text-7xl">
        {clickName === "cel" 
          ? (mainData.main.temp - 273.15).toFixed(1)
          : tempF}
        <sup className="text-4xl font-[500] font-Popin">
          {clickName === "cel" ? "°C" : "°F"}
        </sup>
      </h1>
      <p className="md:text-[24px] lg:text-[18px] text-[18px]">
        {currentday}
        <span className="text-[#959595] ml-2">{currenttime}</span>
      </p>
      <p className="text-[#959595] text-[16px] font-Popin">
        {mainData?.name}
      </p>
    </div>
  );
};

export default Primarydata;