import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
function FetchData() {
  const background = localStorage.getItem('background');
  document.body.style.backgroundImage = background;
  document.body.style.alignItems = "center";
  document.body.style.backgroundSize = "cover";
  document.body.style.overflow = "hidden";
  document.body.style.height = "100vh";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const [tdata, setTdata] = useState([]);
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=4031ecb41488b71e5a538efbf2db03d9`)
      .then(res => {
        console.log(res.data);
        setTdata(res.data.list);
        // console.log(tdata);
      })
      .catch(err => {
        console.log(err);
      })
  }, [lat, lon])

  const groupedData = {};
  const icons = {};
  console.log(tdata);
  tdata.forEach((data) => {
    const date = new Date(data.dt_txt).toLocaleDateString();
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    if (!icons[date]) {
      icons[date] = data.weather[0].icon;
    }
    groupedData[date].push(data);
  })
  console.log(groupedData);
  const avgtemp = {};
  const avgws = {};
  for (const date in groupedData) {
    // console.log(groupedData[date]);
    const temp = groupedData[date].map((data) => data.main.temp);
    const windspeed = groupedData[date].map((data) => data.wind.speed);
    const sum = temp.reduce((a, b) => a + b, 0);
    const sum1 = windspeed.reduce((a, b) => a + b, 0);
    const average = sum / temp.length;
    const avgspeed = sum1 / windspeed.length;
    avgws[date] = avgspeed;
    avgtemp[date] = average;
  }
  // console.log(avgtemp);



  const blocks = Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const dateString = date.toLocaleDateString();

    const avgtemperature = avgtemp[dateString];
    const icon = icons[dateString];
    const avgwindspeed = avgws[dateString];

    if (avgtemperature && avgwindspeed) {
      return (
        <div className='block' key={index}>
          <div className='day'>{dateString}</div>
          <div className='Temp'>
            <div class='avgtemp'>{avgtemperature.toFixed(2)} °C</div>
            <img className='Icon' src={`https://openweathermap.org/img/wn/${icon}.png`} alt="" />
          </div>
          <div className='avgws'>{avgwindspeed.toFixed(2)} m/s</div>
          <div>
            <Link to={`/hourly?data=${encodeURIComponent(JSON.stringify(groupedData))}&date=${encodeURIComponent(JSON.stringify(dateString))}`}>
              <button class="hourlyfc">Hourly Forecast</button>
            </Link>
          </div>
        </div>
      );
    } else {
      return null;
    }
  });



  return (
    <>
      <div className='main main2'>
        <div className='daily'>
          {blocks}
        </div>
      </div>
      <div className="copyrights">
        <p>&copy; 2023 weather forecast. All rights reserved.</p>
      </div>
    </>
  )
}

export default FetchData
