
// import React from "react";
// import './../styles/App.css';

// const App = () => {
//   return (
//     <div>
//         {/* Do not remove the main div */}
//     </div>
//   )
// }

// export default App
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "YOUR_API_KEY_HERE";

  const fetchWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => {
        if (!res.ok) throw new Error("City not found");
        return res.json();
      })
      .then(data => {
        setWeather({
          name: data.name,
          temp: data.main.temp,
          desc: data.weather[0].description,
          icon: data.weather[0].icon
        });
        setError("");
      })
      .catch(() => {
        setWeather(null);
        setError("City not found");
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      const city = query.trim();
      setQuery(""); // ✅ clear input immediately
      fetchWeather(city);
    }
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <input
        type="text"
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter city"
      />
      <div className="weather">
        {weather ? (
          <>
            <h2>{weather.name}</h2>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.desc} />
            <p>{weather.desc}</p>
            <p>Temperature: {weather.temp}°C</p>
          </>
        ) : (
          <p>{error || "Type a city and press Enter"}</p>
        )}
      </div>
    </div>
  );
};

export default App;

