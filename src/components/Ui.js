import React from 'react'
import { Link } from 'react-router-dom';
function Ui(props) {
  return (
    <div>
      {
        <>
           <div className='place'>
               {props.place}
            </div>
          <div className="output">
            <div className='card text-flow'>
              <div className='heading'>Climate</div>
              <div className='value'>{props.climate}</div>
      
              <img className="Icon" src={`https://openweathermap.org/img/wn/${props.icon}.png`} alt="" />
            </div>
            <div className='card text-flow'>
                <div className='heading'>Temperature</div>
                <div className='value'>{props.temperature} °C</div>
            </div>
            <div className='card text-flow'>
              <div className='heading'>Humidity</div>
              <div className='value'>{props.humidity} %</div>
            </div>
            <div className='card text-flow'>
              <div className='heading'>Windspeed</div>
              <div className='value'>{props.ws} m/s</div>
            </div>
          </div>
          <div className='forecast'>
            <Link to={`/about?lat=${props.lat}&lon=${props.lon}`}>
              <button className='fc'>Forecast</button>
            </Link>
          </div>
          
        </>
      }
    </div>
  )
}

export default Ui
