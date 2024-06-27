import React from 'react'
import { useEffect } from 'react';
import clear_sky from '../Images/clear-sky.jpg'
import rainy from '../Images/rainy.jpg'
import clear_night from '../Images/clear_night.jpg'
import Clouds from '../Images/Clouds.jpg'
import dark_clouds from '../Images/dark_clouds.jpg'
import thunder_storm from '../Images/thunder_storm.jpg'
import night_rain from '../Images/night_rain.jpg'

function Ui(props) {
  useEffect(() => {
    document.body.style.alignItems = "center";
    document.body.style.backgroundSize = "cover";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    if (props.mis === "true") {
      document.body.style.backgroundColor = "skyblue";
    }
    if (props.weather === "Clear") {
      if (props.day) {
        document.body.style.backgroundImage = `url(${clear_sky})`;
      }
      else {
        document.body.style.backgroundImage = `url(${clear_night})`;
      }

    }

    else if (props.weather === "Clouds") {

      if (props.climate === "few clouds") {
        if (props.day === true) {
          document.body.style.backgroundImage = `url(${Clouds})`;
        }
        else {
          document.body.style.backgroundImage = `url(${clear_night})`;
        }
      }
      else {
        document.body.style.backgroundImage = `url(${dark_clouds})`;
      }
    }

    else if (props.weather === "Rain" || props.weather === "Drizzle") {
      if (props.day)
        document.body.style.backgroundImage = `url(${rainy})`;
      else
        document.body.style.backgroundImage = `url(${night_rain})`;
    }

    else if (props.weather === "Thunderstorm") {
      document.body.style.backgroundImage = `url(${thunder_storm})`;
    }
    else {
      document.body.style.backgroundImage = "";
    }

    localStorage.setItem('background', document.body.style.backgroundImage);
  }, [props.climate, props.day, props.mis, props.weather])
  
  return (
    <div>
      {
        <>
        </>
      }
    </div>
  )
}

export default Ui
