/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

// eslint-disable-next-line react/display-name
const SearchBar = forwardRef(({ getSearchData }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // is to get the search history from local storage
    const savedHistory = localStorage.getItem("weatherSearchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // is to save the search history in local storage
    if (searchHistory.length > 0) {
      localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory.slice(0, 5)));
    }
  }, [searchHistory]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      getSearchData(inputValue);
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (item) => {
    // is to set the input value to the clicked history item
    setInputValue(item);
    if (getSearchData) {
      getSearchData(item);
    }
    setShowHistory(false);
  };

  const removeHistoryItem = (e, item) => {
    e.stopPropagation();
    setSearchHistory((prev) => prev.filter((i) => i !== item));
  };

  const addToHistory = (city) => {
    if (city) {
      setSearchHistory((prev) => {
        const updatedHistory = prev.filter((item) => item !== city);
        return [city, ...updatedHistory].slice(0, 5);
      });
    }
  };
  // allowing the parent to use the addToHistory
  useImperativeHandle(ref, () => ({
    addToHistory,
  }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowHistory(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="w-full h-8 flex justify-start items-center gap-3 py-2">
        <CiSearch className="text-2xl font-extrabold" />
        <input
          type="text"
          value={inputValue}
          placeholder="Search city..."
          onChange={handleInputChange}
          onFocus={() => setShowHistory(true)}
          onBlur={() => {
            setTimeout(() => setShowHistory(false), 100);
          }}
          onKeyDown={handleKeyDown}
          className="border-none outline-none font-Popin text-sm placeholder:font-Popin placeholder:font-normal placeholder:text-[#606060] bg-transparent h-80% w-full"
        />
      </div>


      {showHistory && searchHistory.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-1 z-10 max-h-60 overflow-y-auto">
          <div className="p-2 text-xs text-gray-500 border-b">Recent searches</div>
          {searchHistory.map((item, index) => (
            <div
                key={index}
                className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
                onMouseDown={() => {
                  handleHistoryClick(item);
                }}
                style={{outline: "none"}}
              >

              <span>{item}</span>
              <button
                onClick={(e) => removeHistoryItem(e, item)}
                className="text-gray-400 hover:text-gray-600"
              >
                <IoClose size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default SearchBar;