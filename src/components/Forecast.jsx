/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import moment from "moment";

const Forecast = ({ forecastData, unit }) => {
  if (!forecastData || !forecastData.list) {
    return (
      <div className="col-span-3 w-[240px] h-[200px] bg-gray-100 rounded-2xl p-4 flex items-center justify-center text-gray-500">
        No forecast data available
      </div>
    );
  }

  const dailyData = forecastData.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 5);

  return (
    <div className="col-span-1 w-[550px] h-[250px] bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
        5-Day Forecast
      </h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide items-stretch pr-1">
        {dailyData.map((day, idx) => (
          <div
            key={idx}
            className="min-w-[90px] flex-shrink-0 flex flex-col items-center justify-center bg-white rounded-xl p-3 shadow-md hover:bg-blue-50 transform transition-transform duration-200 ease-in-out hover:scale-105"
            style={{ height: "140px" }}
          >
            <span className="text-sm font-semibold text-gray-700 mb-1">
              {moment(day.dt_txt).format("ddd")}
            </span>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={`Weather icon for ${day.weather[0].description}`}
              className="w-10 h-10 my-1"
            />
            <span className="text-sm font-medium text-gray-600 mt-1">
              {unit === "cel"
                ? `${Math.round(day.main.temp - 273.15)}°C`
                : `${Math.round((day.main.temp - 273.15) * 9 / 5 + 32)}°F`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
