import { react, useEffect, useState } from "react";
import "./App.css";
import search from "./images/search.svg";

function App() {
  const [weather, setWeather] = useState({});
  const [fullDate, setFullDate] = useState("");
  const [text, setText] = useState("");

  const setBackground = () => {
    fetch(
      `https://api.unsplash.com/search/photos/?client_id=_6koYtW21O8HJmVbC8i8xQ_y4ilVGjNjm8HtQvTB8fA&query=${weather.condition
        .split(" ")
        .join("+")}&orientation=landscape`,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((data) => {
        document.querySelector(".App").style.backgroundImage = `url(
          "${data.results[(Math.random() * 10).toFixed() - 1].urls.full}"
        )`;
      });
  };

  const searchByCity = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ce258b1ba4d1ab38ebdbd2ca8964ff13&lang=pt_br&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather({
          temp: Math.floor(data.main.temp),
          minTemp: Math.floor(data.main.temp_min),
          maxTemp: Math.floor(data.main.temp_max),
          city: `${data.name} / ${data.sys.country}`,
          condition: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      })
      .catch((error) => alert("Invalid City"));
    setBackground();
  };

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
            setBackground();
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
          <div className="search">
            <input
              type="text"
              id="search"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div
              className="btn"
              onClick={() => {
                searchByCity(text);
              }}
            >
              <img src={search} alt="search" />
            </div>
          </div>
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
