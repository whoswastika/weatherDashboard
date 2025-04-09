/* eslint-disable react/prop-types */

const WeatherCard = ({ data, unit }) => {
  // this is for the lazy loading of the weather card
  const temperature = data.main.temp;
  const weatherCondition = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const weatherIcon = data.weather[0].icon ? (
    <img
      src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
      alt={weatherCondition}
      className="w-16 h-16"
    />
  ) : null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-semibold text-gray-800">{data.name}</h3>
      {weatherIcon && <div className="mx-auto">{weatherIcon}</div>}
      <p className="text-3xl font-bold text-gray-700">
        {temperature}°{unit.toUpperCase()}
      </p>
      <p className="text-lg text-gray-600 capitalize">{weatherCondition}</p>
      <div className="mt-4 space-y-2">
        <p className="text-gray-600">Humidity: {humidity}%</p>
        <p className="text-gray-600">Wind Speed: {windSpeed} km/h</p>
      </div>
    </div>
  );
};

export default WeatherCard;