import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'

function App() {
  const [coordinate, setCoordinate] = useState()

  useEffect(()=>{
    const success= pos=>{
      const latLon={
        lat:pos.coords.latitude,
        lon:pos.coords.longitude
      }

      setCoordinate(latLon)

    }
   navigator.geolocation.getCurrentPosition(success)

  },[])
console.log(coordinate)
    
  return (
    <div className="App">
      
        <CardWeather coordinate={coordinate}/>
        
    </div>
  )
}

export default App
