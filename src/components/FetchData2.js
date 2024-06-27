import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'
import Ui from './Ui'
import Background from './Background';
import { AiOutlineSearch } from "react-icons/ai";

function FetchData2() {
  const [city, setCity] = useState('Hyderabad')
  const [post, setPost] = useState({})
  const [cityButton, setCityButton] = useState('');
  const [count, setCount] = useState(0);
  const [climate, setClimate] = useState('Scattered Clouds');
  const [temp, setTemp] = useState(30);
  const [weather, setWeather] = useState('Clouds');
  const [icon, setIcon] = useState('04n');
  const [day, setDay] = useState(0);
  const [mis, setMis] = useState(false);
  const [humidity, setHumidity] = useState(50);
  const [windSpeed, setWindSpeed] = useState(20);
  const [place, setPlace] = useState('');
  const [lati, setLati] = useState(0);
  const [longi, setLongi] = useState(0);
  useEffect(() => {
    document.title = "Weather-forecast"
    axios
      .get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityButton}&limit=1&appid=4031ecb41488b71e5a538efbf2db03d9`)
      .then((res) => {
        setPost(res.data[0]);
        // console.log(res);
        setLati(res.data[0].lat);
        setLongi(res.data[0].lon);
        setPlace(res.data[0].name + ", " + res.data[0].state);

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&units=metric&appid=4031ecb41488b71e5a538efbf2db03d9`)
          .then((res) => {
            setClimate(res.data.weather[0].description);
            setWeather(res.data.weather[0].main);
            setIcon(res.data.weather[0].icon);
            setTemp(res.data.main.temp);
            setHumidity(res.data.main.humidity);
            setWindSpeed(res.data.wind.speed);
            // console.log(res.data.main.temp);
            if (icon.charAt(icon.length - 1) === "d") {
              // console.log("day");
              setDay(true);
            } else {
              setDay(false);
            }
          })
          .catch((err) => {
            setMis(true);
            console.log(err);
          });
      })

  }, [city,cityButton, icon, mis]);




  const changeHandler = (e) => {
    e.preventDefault();
    setCityButton(city);
    setCount(prevState => prevState + 1);
  }
  return (
    <>
      <div className="main">
        <div className="form">
          <form className="forum">
            <div className="header">
              <input type="text" className="input" name="place" value={city} placeholder="search for a city" onChange={e => setCity(e.target.value)} />
              <div className="searchbg">
              <button className="search" onClick={changeHandler}>Search</button>
              </div>
            </div>
          </form>
        </div>
        <div className="out">
          <Background climate={climate} weather={weather} day={day} mis={mis} />
          <Ui climate={climate} weather={weather} temperature={temp} post={post} count={count} icon={icon} day={day} mis={mis} humidity={humidity} ws={windSpeed} place={place} lat={lati} lon={longi} />
        </div>
      </div>
      <div className="copyrights">
        <p>&copy; 2023 weather forecast. All rights reserved.</p>
      </div>
    </>
  )
}

export default FetchData2
