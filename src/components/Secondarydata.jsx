/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import lonImage from "../assets/longitude.png";
import latImage from "../assets/latitude.png";

import clear_sky from "../assets/WeatherIcons/clear_sky.png"; 
import rain from "../assets/WeatherIcons/rain.png";           
import snow from "../assets/WeatherIcons/snow.png";

const Secondarydata = ({ mainData }) => {
  const [weatherDescription, setWeatherDescription] = useState("");
  const [weatherIcon, setWeatherIcon] = useState(null);

  useEffect(() => {
    // if maindata == null then return
    if (!mainData || !mainData.weather || !mainData.coord) return;
    // intializing the weather description
    const description = mainData.weather[0]?.description || "";
    setWeatherDescription(description);

    const lowerDesc = description.toLowerCase();
    let icon = clear_sky;

    if (lowerDesc.includes("rain")) {
      icon = rain;
    } else if (lowerDesc.includes("snow")) {
      icon = snow;
    } else if (lowerDesc.includes("clear")) {
      icon = clear_sky;
    }

    setWeatherIcon(icon);
  }, [mainData]);

  if (!mainData || !mainData.weather || !mainData.coord) {
    return (
      <div className="w-[90%] flex flex-col lg:flex-col xs:flex-col sm:flex-row items-start justify-between gap-4 py-6 border-t-2">
        <div className="animate-pulse bg-gray-200 w-24 h-6 rounded"></div>
        <div className="animate-pulse bg-gray-200 w-24 h-6 rounded"></div>
        <div className="animate-pulse bg-gray-200 w-24 h-6 rounded"></div>
      </div>
    );
  }

  return (
    <div className="w-[90%] flex flex-col lg:flex-col xs:flex-col sm:flex-row items-start justify-between gap-4 py-6 border-t-2">
      <div className="row flex items-center gap-3">
        <img 
          src={weatherIcon} 
          alt="weather-icon" 
          className="w-[30px] lg:w-[30px] md:w-[50px]" 
        />
        <span className="text-[#272727] font-Popin text-[14px] lg:text-[14px] md:text-[16px] font-[500]">
          {weatherDescription}
        </span>
      </div>
      <div className="row flex items-center gap-3">
        <img src={latImage} alt="lat-icon" className="w-[30px] lg:w-[30px] md:w-[50px]" />
        <span className="text-[#272727] font-Popin text-[14px] lg:text-[14px] md:text-[16px] font-[500]">
          {mainData.coord?.lat || "N/A"}
        </span>
      </div>
      <div className="row flex items-center gap-3">
        <img src={lonImage} alt="lon-icon" className="w-[30px] lg:w-[30px] md:w-[50px]" />
        <span className="text-[#272727] font-Popin text-[14px] lg:text-[14px] md:text-[16px] font-[500]">
          {mainData.coord?.lon || "N/A"}
        </span>
      </div>
    </div>
  );
};

export default Secondarydata;
