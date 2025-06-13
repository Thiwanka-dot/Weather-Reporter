import style from './weather.module.css'
import {FaMapMarkedAlt, FaSearch, FaSun, FaTint} from 'react-icons/fa'
import {MdAir, MdGrain} from 'react-icons/md'

export default function Weather() {
    return (
        <div className={style.report}>
            <div className={style.reportInfo}>
                <div className={style.search}>
                    <div className={style.searchBox}>
                        <FaMapMarkedAlt size={28} fill='#ffeb3b'/>
                        <input type='text' placeholder='Search any location...'/>
                        <button type="submit"><FaSearch /></button>
                    </div>
                </div>
                <div className={style.forecast}>
                    <div className={style.locationInfo}>
                        <div className={style.locDetails}>
                            <div className={style.locText}>
                                <h2>Colombo, SL</h2>
                                <p>Monday, 20 March 2023</p>
                                <p>12:30 PM</p>
                            </div>                            
                            <h1>12°C</h1>
                        </div>
                        <img src="./src/assets/cloudy.png" alt="" />
                    </div>
                    <div className={style.weatherInfo}>
                        <h2>Today's Forecast</h2>
                        <ul>
                            <li>
                                <span>23</span>
                                <div className={style.text}>
                                    <FaTint/>
                                    <p>Humidity</p>
                                </div>                                
                            </li>
                            <li>
                                <span>23</span>
                                <div className={style.text}>
                                    <MdAir/>
                                    <p>Wind Speed</p>
                                </div>
                            </li>
                            <li>
                                <span>23</span>
                                <div className={style.text}>
                                    <FaSun/>
                                    <p>UV Index</p>
                                </div>
                            </li>
                            <li>
                                <span>23</span>
                                <div className={style.text}>
                                    <MdGrain/>
                                    <p>Air Quality</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}