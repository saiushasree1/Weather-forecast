import React from 'react'
import { useLocation } from 'react-router-dom';
import humidity from '../Images/humidity.png';
function Hourly() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const data = searchParams.get('data');
    const wpdate = searchParams.get('date');

    const parsedData = JSON.parse(decodeURIComponent(data));
    const date = JSON.parse(decodeURIComponent(wpdate));
    // console.log(parsedData[date]);
    let res = parsedData[date];
    let n = res.length;

    const blocks = Array.from({ length: 4 }, (_, index) => {
        if (index < n) {
            const temp = res[index].main.temp;
            const hum = res[index].main.humidity;
            const icon = res[index].weather[0].icon;
            let time = (res[index].dt_txt);
            time = time.slice(11, 16);

            // console.log(icon);
            return (
                <div class="block">
                    <div clas="htime">{time}</div>
                    <div class="htemp">Temp : {temp}°C</div>
                    <div>
                        <div class="hhumi">
                            Humid : {hum} %
                            <img className='humiIcon' src={humidity} alt="" />
                        </div>

                    </div>
                    <img className='Icon' src={`https://openweathermap.org/img/wn/${icon}.png`} alt="" />
                </div>
            )
        }
        else {
            return (
                <div class="block">
                    No data
                </div>
            )
        }
    })
    const row2 = Array.from({ length: 4 }, (_, index) => {
        if (index + 4 < n) {
            // console.log(index + 4);
            const temp = res[index + 4].main.temp;
            const hum = res[index + 4].main.humidity;
            const icon = res[index + 4].weather[0].icon;
            let time = (res[index + 4].dt_txt);
            time = time.slice(11, 16);
            // console.log(icon);
            return (
                <div class="block">
                    <div clas="htime">{time}</div>
                    <div class="htemp">Temp : {temp}°C</div>
                    <div class="hhumi">
                        Humid : {hum} %
                        <img className='humiIcon' src={humidity} alt="" />
                    </div>
                    <img className='Icon' src={`https://openweathermap.org/img/wn/${icon}.png`} alt="" />
                </div>
            )
        }
        else {
            return (
                <div class="block">
                    No data
                </div>
            )
        }
    })


    return (
        <>
            <div className="main main3">
                <div className="hourly">
                    {blocks}
                </div>
                <div className="hourly">
                    {row2}
                </div>
            </div>
            <div className="copyrights">
                <p>&copy; 2023 weather forecast. All rights reserved.</p>
            </div>
        </>
    )
}

export default Hourly
