import { useState } from "react";
import axios from "axios";
const Home = () => {

    const [city,setCity] = useState("");
    const [data,setData] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = async() =>{
        if (!city.trim()) {
            setErrorMsg("Please enter a city name.");
            return;
        }
        try{
            const res = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no&no=1`
            );
            console.log(res);
            setData(res.data);
            setErrorMsg("");
        }catch(error){
            setErrorMsg("City not found or network error. Try again.");
            setData(null);
        }

    }


    return (
        <div className="bg-[url('https://i.imgur.com/DTf69H5.jpeg')] bg-cover bg-center h-screen m-0">
            <div className="flex  justify-center py-4 text-4xl font-bold text-teal-100 ">Weather App 🌤️</div>
            <div className="flex justify-center items-center p-4 gap-4">
                <input 
                type="text"  
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-gray-100 rounded-2xl text-center px-1 py-1" placeholder="Enter city name"/>
                <button
                onClick={fetchWeather}
                 className="bg-purple-500 hover:bg-purple-600 hover:scale-105 hover:shadow-lg transition-all duration-300 text-white px-4 py-1 rounded-2xl text-xl">Search🔍</button>
            </div>
            <div className="flex justify-center items-center h-[60vh]">
                {data &&
                    <div className="space y-2 bg-white/30 flex flex-col p-4 rounded-2xl w-[400px] mx-auto  justify-center items-center hover:scale-105 transition-transform duration-300">
                        <img src={`https:${data.current.condition.icon}`} alt="weather icon" className="h-[150px] w-[150px]" />

                        { [
                            { label: "City", value: data.location.name  },
                            { label: "Condition", value: data.current.condition.text  },
                            { label: "Humidity", value: data.current.humidity + " 💧" },
                            { label: "Wind", value: data.current.wind_kph + " kph 🌬️" },
                            { label: "Feels Like", value: data.current.feelslike_c + "°C 🥵" },
                            { label: "UV Index", value: data.current.uv + " ☀️" },
                        ]
                        .map((item)=>(
                            <div className="hover:shadow-xl transition-shadow duration-300 ">
                               
                                <p key={item.label} className="px-4 py-1">

                                    <strong>{item.label}:</strong> {item.value}
                                </p>

                            </div>
                        ))}
                    </div>    
                }

            </div>
                
            {errorMsg && (
                <div className="space y-2 bg-white/30 flex flex-col p-4 rounded-2xl w-[400px] mx-auto  justify-center items-center hover:scale-105 transition-transform duration-300">
                    <p className="text-white font-semibold text-center">🚫{errorMsg}</p>
                </div>
            )}
                
        </div>
    )
}
export default Home;