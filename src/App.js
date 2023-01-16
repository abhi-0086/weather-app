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
  const [inputValue, setInputValue] = useState('');

  //fetch data usng useEffect hook
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
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

  
  let icon;
  console.log(data.weather[0].main);//seeing data we get the weather condition data.weather[0].main as you see in console of data.weather

  //set the icon according to the weather condition
  switch(data.weather[0].main){
    case 'Clouds':
      icon = <IoMdCloudy />
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill />
      break;
    case 'Rain':
      icon = <IoMdRainy />
      break;
    case 'Clear':
      icon = <IoMdSunny />
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill />
      break;
    case 'Snow':
      icon = <IoMdSnow />
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm />
      break;
  }

  //date object
  const date = new Date();

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center'>

      {/*form */}
      <form className='h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-6'>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input type="text" placeholder='Search by City or Country' className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-lg font-light pl-6 h-full ' />
          <button className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex items-center justify-center transition'>
            <IoMdSearch className='text-2xl text-white' />
          </button>
        </div>
      </form>

      {/*card */}
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        <div>
          {/*card top */}
          <div className='flex items-center gap-x-4'>
            {/*icon */}
            <div className='text-[87px]'>{icon}</div>
            
            <div>
              {/*country name */}
              <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
              <div>
                {/*date */}
                <div>{date.getUTCDate()}/{date.getUTCMonth()+1}/{date.getUTCFullYear()}</div>
              </div>
            </div>
          </div>

          {/*card body */}
          <div className='my-16'>
            {/**temperature details */}
            <div className='flex justify-center items-center'>
              {/**temperarture */}
              <div className='text-[144px] leading-none font-light'>
                {parseInt(data.main.temp)}
              </div>
              {/**celcius icon */}
              <div className='text-4xl'>
                <TbTemperatureCelsius />
              </div>
            </div>
            {/**weather description */}
            <div className='capitalize text-center'>
              {data.weather[0].description}
            </div>
          </div>

          {/*card bottom */}
          <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>

            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/**icon */}
                <div className='text-[20px]'>
                  <BsEye />
                </div>
                <div>
                  Visibility {' '} <span className='ml-2'>{data.visibility / 1000} Km</span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                {/**icon */}
                <div className='text-[20px]'>
                  <BsThermometer />
                </div>
                <div className='flex'>
                  Feels Like 
                  <div className='flex ml-2'>
                    {parseInt(data.main.feels_like)}
                    <TbTemperatureCelsius />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between'>
              <div className='flex items-center gap-x-2'>
                {/**icon */}
                <div className='text-[20px]'>
                  <BsWater />
                </div>
                <div>
                  Humidity <span className='ml-2'>{data.main.humidity} %</span>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                {/**icon */}
                <div className='text-[20px]'>
                  <BsWind />
                </div>
                <div>
                  Wind <span className='ml-2'>{data.wind.speed} m/s</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
