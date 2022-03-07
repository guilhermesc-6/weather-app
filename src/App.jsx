import { react, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState({});
  const [fullDate, setFullDate] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;

        let apikey = "ce258b1ba4d1ab38ebdbd2ca8964ff13";
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&lang=pt_br&units=metric`;

        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setWeather({
              temp: Math.floor(data.main.temp),
              minTemp: Math.floor(data.main.temp_min),
              maxTemp: Math.floor(data.main.temp_max),
              city: `${data.name} / ${data.sys.country}`,
              condition: data.weather[0].description,
              icon: data.weather[0].icon,
            });
          });

        let date = new Date();
        const month = [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ];
        setFullDate(
          `${month[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
        );
      });
    }
  }, []);

  return (
    <div className="App">
      <div className="glass">
        <main>
          <aside className="weather-info">
            <div className="location">
              {weather.city}
              <span className="date">{fullDate}</span>
            </div>
            <div className="condition">
              <span className="icon">
                <img
                  src={
                    weather.icon
                      ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
                      : ""
                  }
                  alt={weather.condition}
                />
              </span>
              <span className="wcondition">{weather.condition}</span>
            </div>
          </aside>
          <article className="temp">
            <span className="current-temp">
              {weather.temp ? `${weather.temp}°` : ""}
            </span>
            <span className="min-max-temp">
              {weather.maxTemp ? `${weather.maxTemp}°/` : ""}
              <span>{weather.minTemp ? `${weather.minTemp}°` : ""}</span>
            </span>
          </article>
        </main>
      </div>
    </div>
  );
}

export default App;
