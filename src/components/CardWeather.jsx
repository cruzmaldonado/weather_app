import axios from 'axios'
import { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'

const CardWeather = ({coordinate}) => {   

    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    let grade="standard"
    
    if(temperature)
    grade="standard"
    else 
    grade="imperial"
    
    useEffect(()=>{
        if(coordinate){            
            const APIKey=`b53476ea8872285f08d886f4c2b88536`     
            const url=`https://api.openweathermap.org/data/2.5/weather?lat=${coordinate.lat}&lon=${coordinate.lon}&lang=es&units=${grade}&appid=${APIKey}`
            axios.get(url)
            .then(res=>{
            setWeather(res.data)
            setIsLoading(false)
            })  
            .catch(err=>console.log(err))
        }
    },[coordinate,temperature])
           
    const changeOfUnit=()=> setTemperature(!temperature)
    if(isLoading){
        return <LoadingScreen/>
    }
    else{
    
  return (

<article className='card'>
    <h1 className='card__title'> Weather app</h1>
    <h2 className='card.date'>{`${weather?.name},${weather?.sys.country}`}</h2>
    <div className="card__detail">
        <div className='card__image'>
        <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather" />
        <h2 className='card__temperature'>{temperature? weather?.main.temp +"°K":weather?.main.temp +"°F"}</h2>
      </div>
        <div className='card__info'>
        <h3>&#34;{weather && weather.weather[0].description}&#34;</h3>
        <ul>
        <li>
          <span>
        <i className="fa-solid fa-wind"></i>
         wind speed:{weather?.wind.speed}m/s</span></li>
        <li><span>
        <i className="fa-solid fa-cloud"></i>       
         clouds: {weather?.clouds.all}%</span></li>
        <li><span>
        <i className="fa-solid fa-thermometer"></i>
         pressure: {weather?.main.pressure} hPa</span></li>
        </ul>
        </div>       
    </div>
    
    <button onClick={changeOfUnit} className="card__button button">{temperature? "chance to °F":"chance to °K"}</button>


</article>
  )
    }
}

export default CardWeather