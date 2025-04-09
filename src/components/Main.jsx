/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import SearchBar from "./SearchBar";
import Primarydata from "./Primarydata";
import Secondarydata from "./Secondarydata";
import WindStatus from "./WindStatus";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import { Toaster, toast } from "react-hot-toast";
import "./WeatherCard";
import Forecast from "./Forecast";

const Main = () => {
  const api_key = import.meta.env.VITE_API_KEY || "4848e232a8a3379839a72488f0644aec";
  const searchRef = useRef(null);
  const [wdata, setWdata] = useState(null);
  const [search, setSearch] = useState("Mumbai");
  const [clickName, setClickName] = useState("cel");
  const [celbtnactive, setCelBtnActive] = useState(true);
  const [fahbtnactive, setFahBtnActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forecastData, setForecastData] = useState(null);

  const fetchAPI = async () => {
    setLoading(true);

    await toast.promise(
      (async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`
        );
        const result = await response.json();
        console.log("Fetch result:", result);
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${api_key}`
        );
        const forecastData = await forecastRes.json();
        if (forecastData.cod !== "200") throw new Error("Forecast fetch failed");
        setForecastData(forecastData);
        if (result.cod === 200 && searchRef.current) {
          searchRef.current.addToHistory(result.name);
          setWdata(result);
          setSearch(result.name);
        } else {
          setWdata(null);
          throw new Error(`City "${search}" not found!`);
        }
      })(),
      {
        loading: "Fetching weather...",
        success: "Weather data loaded!",
        error: (err) => err.message || "Failed to fetch weather data!",
      },
      {
        position: "top-right",
        duration: 3000,
      }
    );
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      fetchAPI();
    }
  }, [search]);

  const celclick = () => {
    setClickName("cel");
    setCelBtnActive(true);
    setFahBtnActive(false);
  };

  const fahclick = () => {
    setClickName("fah");
    setFahBtnActive(true);
    setCelBtnActive(false);
  };

  const getDataFromSearchBar = (childData) => {
    console.log("getSearchData called with:", childData);
    setSearch(childData);
  };

  const handleRefresh = () => {
    if (search) {
      fetchAPI();
    }
  };

  return (
    <div className="Main w-screen h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center p-4">
      <div className="container w-[90%] lg:w-[85%] max-w-4xl h-[90vh] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="left-col w-full lg:w-1/3 h-full bg-white p-6 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <SearchBar getSearchData={getDataFromSearchBar} ref={searchRef} />
            <button
              onClick={handleRefresh}
              className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              <svg
                className="w-10 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8 8 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8 8 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>
          <Suspense fallback={<div className="text-center text-gray-500">Loading weather data...</div>}>
            {wdata && !loading ? (
              <></>
            ) : !loading && !wdata ? (
              <div className="text-center text-gray-500">No weather data available</div>
            ) : null}
          </Suspense>
          <Primarydata mainData={wdata} clickName={clickName} />
          <Secondarydata mainData={wdata} />
        </div>
        <div className="right-col w-full lg:w-2/3 h-full bg-gray-50 p-6 flex flex-col gap-6">
          <div className="top-row flex justify-between items-center bg-white rounded-lg p-4 shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">Todays Highlights</h2>
            <div className="flex gap-2 items-center">
              <button
                onClick={celclick}
                className={`w-10 h-10 flex items-center justify-center text-lg font-medium rounded-full shadow-md ${
                  celbtnactive ? "bg-black text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                °C
              </button>
              <button
                onClick={fahclick}
                className={`w-10 h-10 flex items-center justify-center text-lg font-medium rounded-full shadow-md ${
                  fahbtnactive ? "bg-black text-white" : "bg-gray-200 text-gray-700"
                }`}
              >
                °F
              </button>
            </div>
          </div>
          <div className="bottom-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Visibility mainData={wdata} />
            <WindStatus mainData={wdata} />
            <Humidity mainData={wdata} />
            <div className="lg:col-span-1 sm:col-span-2">
              <Forecast forecastData={forecastData} unit={clickName} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Main;