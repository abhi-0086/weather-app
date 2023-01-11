import React, { useState, useEffect } from 'react'

//import axios
import axios from 'axios';

//import icons
import {
  IoMdSunny,
  IoMdRainy, 
  IoMdCloudy, 
  IoMdSnow, 
  IoMdThunderstorm, 
  IoMdSearch,
} from 'react-icons/io';

import { BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind } from'react-icons/bs';
import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';

//api key
const APIkey = '58ec3d77e151205f78f27b8d9816a99e';


const App = () => {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Udaipur');

  //fetch data usng useEffect hook
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  //console log the data
  // console.log(data);

  //if the data is false aor there is any error then we have to show the loader
  if(!data){
    return(
      <div>
        <div>
          <ImSpinner8 className='text-5xl animate-spin' />
        </div>
      </div>
    )
  }

  //set the icon according toh the weather condition
  let icon;
  console.log(data.weather[0].main);//seeing data we get the weather condition data.weather[0].main as you see in console of data.weather

  return (
    <div>React App</div>
  )
}

export default App;
