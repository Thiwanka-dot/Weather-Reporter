import { useEffect, useState } from 'react';
import style from './weather.module.css';
import { FaMapMarkedAlt, FaSearch, FaSun, FaTint } from 'react-icons/fa';
import { MdAir, MdGrain } from 'react-icons/md';

export default function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState("Colombo");
    const [search, setSearch] = useState("");

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const icons = import.meta.glob('/src/assets/weather_icons/*.png', { eager: true });

    useEffect(() => {
        fetchWeatherData(location);
    }, [location]);

    const fetchWeatherData = async (city) => {
        try {
            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
            );
            const data = await res.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setLocation(search.trim());
            setSearch("");
        }
    };

    const loc = weatherData?.location;
    const current = weatherData?.current;

    const weatherIcons = {};
    for (const path in icons) {
        const fileName = path.split('/').pop();
        weatherIcons[fileName] = icons[path].default;
    }

    const getCustomWeatherImage = (code, isDay) => {
        const suffix = isDay === 1 ? 'day' : 'night';

        const dayNightFile = `${code}_${suffix}.png`;
        const bothFile = `${code}_both.png`;

        if (weatherIcons[dayNightFile]) {
            return weatherIcons[dayNightFile];
        } else if (weatherIcons[bothFile]) {
            return weatherIcons[bothFile];
        } else {
            return weatherIcons['1000_day.png'];
        }
    };

    return (
        <div className={style.report}>
            <div className={style.reportInfo}>
                <form className={style.search} onSubmit={handleSearch}>
                    <div className={style.searchBox}>
                        <FaMapMarkedAlt size={28} fill="#ffeb3b" />
                        <input
                            type="text"
                            placeholder="Search any location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type="submit"><FaSearch /></button>
                    </div>
                </form>

                <div className={style.forecast}>
                    <div className={style.locationInfo}>
                        <div className={style.locDetails}>
                            <div className={style.locText}>
                                <h2>{loc?.name ?? "City Name"}, {loc?.country ?? "Country"}</h2>
                                <p>{loc?.localtime?.split(" ")[0] ?? "Date"}</p>
                                <p>{loc?.localtime?.split(" ")[1] ?? "Time"}</p>
                            </div>
                            <div className={style.locTitle}>
                               <h1>{current?.temp_c ?? "Temp"}°C</h1>
                               <h4>{current?.condition?.text ?? "Weather Condition"}</h4>
                            </div>
                        </div>
                        <img
                            src={getCustomWeatherImage(current?.condition?.code, current?.is_day)}
                            alt={current?.condition?.text ?? "Weather"}
                        />
                    </div>

                    <div className={style.weatherInfo}>
                        <h2>Today's Forecast</h2>
                        <ul>
                            <li>
                                <span>{current?.humidity ?? "--"}%</span>
                                <div className={style.text}>
                                    <FaTint />
                                    <p>Humidity</p>
                                </div>
                            </li>
                            <li>
                                <span>{current?.wind_kph ?? "--"} km/h</span>
                                <div className={style.text}>
                                    <MdAir />
                                    <p>Wind Speed</p>
                                </div>
                            </li>
                            <li>
                                <span>{current?.uv ?? "--"}</span>
                                <div className={style.text}>
                                    <FaSun />
                                    <p>UV Index</p>
                                </div>
                            </li>
                            <li>
                                <span>{current?.air_quality?.['us-epa-index'] ?? "--"}</span>
                                <div className={style.text}>
                                    <MdGrain />
                                    <p>Air Quality</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
